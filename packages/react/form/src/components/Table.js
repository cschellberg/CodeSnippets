import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {selectMember,deleteMember, selectAllMembers} from '../features/member/memberSlice';

function Table({config}) {
    const [headers, setHeaders] = useState([]);
    const members = useSelector(selectAllMembers);
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
        const selectedItem = members.find(member => {
            return member.id === id
        });
        if (selectedItem) {
            dispatch(selectMember(selectedItem));
        }
    }

        const deleteItem = (id) => {
            const deleteItem = members.find(member => {
                return member.id === id
            });
            if (deleteItem) {
                dispatch(deleteMember(deleteItem));
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
            {members.map((item, rowIndex) => (
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