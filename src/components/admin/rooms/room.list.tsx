'use client'
import React from 'react';
import Button from 'react-bootstrap/Button';
import { ROOM_API_URL } from '@/constants';
import { useState, useEffect } from "react";
import IsLoading from '@/components/admin/isLoading'
import useSWR from 'swr'
import RoomTable from '@/components/admin/rooms/room.table'
import Fuse from 'fuse.js';

function RoomList() {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const ROWS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<IRoom[]>([]);

    const fetcher = (...args: Parameters<typeof fetch>) =>
        fetch(...args).then((res) => res.json());
    const { data, isLoading, mutate } = useSWR(`${ROOM_API_URL}?page=${pageIndex}&size=${ROWS_PER_PAGE}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    const { data: dataLength } = useSWR(`${ROOM_API_URL}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    useEffect(() => {
        if (dataLength) {
            setTotalRows(dataLength.length);
        }
    }, [dataLength]);

    const isLastPage = (pageIndex + 1) * ROWS_PER_PAGE >= totalRows;
    const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setPageIndex(prevPageIndex => prevPageIndex - 1);
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        setPageIndex(pageNumber - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setPageIndex(prevPageIndex => prevPageIndex + 1);
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const fuse = new Fuse(dataLength, {
        includeScore: true,
        keys: ['roomID', 'roomName'],
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (data) {
            const result = fuse.search(query);
            setFilteredData(result.map((item: any) => item.item));
        }
    };

    if (isLoading) return (
        <IsLoading />
    );
    else if (data)
        return (
            <div>
                <div className="my-3" style={{ display: "flex", justifyContent: 'space-between' }}>
                    <h2>Danh sách phòng học</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            className="form-control mx-1"
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button className="form-control mx-1" onClick={() => { setShowModalCreate(true) }} variant="primary">Thêm</Button>
                    </div>
                </div>
                {searchQuery.trim() === '' ? (
                    <React.Fragment>
                        <RoomTable
                            rooms={data}
                            showModalCreate={showModalCreate}
                            setShowModalCreate={setShowModalCreate}
                        />
                        <div className='d-flex justify-content-end'>
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className={`page-item ${pageIndex === 0 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={handlePreviousPage}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={handleNextPage} disabled={isLastPage}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </React.Fragment>
                ) : (
                    <RoomTable
                        rooms={filteredData}
                        showModalCreate={showModalCreate}
                        setShowModalCreate={setShowModalCreate}
                    />
                )}
            </div>
        );
}

export default RoomList;