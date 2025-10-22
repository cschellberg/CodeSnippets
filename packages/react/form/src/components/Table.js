import React, {useEffect, useState,useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {selectSliceItem,deleteSliceItem, selectAllItemsBySliceType} from '../redux/item/itemSlice.js';

function Table({config,sliceType}) {
    const [headers, setHeaders] = useState([]);
    const selectItemsBySliceType = useMemo(selectAllItemsBySliceType, []);
    const items = useSelector((state) => selectItemsBySliceType(state, sliceType));
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(config)
            .then(response => {
                return response.json();
            })
            .then(initialFormConfig => {
               const  headers=initialFormConfig.elements.filter(element=>element.type !== "submit").map(element=>element.name);
               setHeaders(headers);
            })
            .catch(error => console.error('Startup fetch error:' + error));

    }, []);

    const selectItem = (id) => {
        const selectedItem = items.find(item => {
            return item.id === id
        });
        if (selectedItem) {
            dispatch(selectSliceItem({sliceType:sliceType,data:selectedItem}));
        }
    }

        const deleteItem = (id) => {
            const deleteItem = items.find(item => {
                return item.id === id
            });
            if (deleteItem) {
                dispatch(deleteSliceItem({sliceType:sliceType,data:deleteItem}));
            }
        }

    return (<div className="table-responsive">
        <table className="custom-table">
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, rowIndex) => (
                <tr key={item.id || rowIndex}> {/* Use a unique ID from data or rowIndex */}
                    {headers.map((column, colIndex) => (
                        <td key={colIndex}>
                            {item[column]}
                        </td>
                    ))}
                    <td><button className="table-button" onClick={()=>selectItem(item["id"])}>Edit</button></td>
                    <td><button className="table-button" onClick={()=>deleteItem(item["id"])}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>);
}

export default Table;