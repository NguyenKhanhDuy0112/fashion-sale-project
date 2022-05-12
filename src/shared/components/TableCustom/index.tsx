import React, { ReactChild, ReactComponentElement, ReactNode } from "react";


interface TableData {
    headers: string[],
    children: ReactNode | ReactChild | ReactComponentElement<any>
}

function TableCustom(props: TableData) {
    const { headers, children } = props



    return (
        <div className="table-responsive">
            <table className="tableCustom">
                <thead>
                    <tr>
                        {headers.map((head, index) => <th style={{width: `${head.toLowerCase() === 'hành động' || head.toLowerCase() === '#' ? '5rem': 'auto'}`}} key={index}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}

export default TableCustom;