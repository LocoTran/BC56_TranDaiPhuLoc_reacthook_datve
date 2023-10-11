import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHON_GHE } from "../redux/constant/datVeConst";
import { message } from "antd";

function DanhSachGhe() {
    let arrPicked = useSelector((state) => state.datVeReducer.arrPicked);
    const arrChair = useSelector((state) => state.datVeReducer.arrChair);
    let dispatch = useDispatch();

    let handleChonGhe = (ghe) => {
        if (arrPicked.includes(ghe)) {
            dispatch({
                type: CHON_GHE,
                payload: arrPicked.filter((g) => g !== ghe),
            });
            message.success(`Bạn đã hủy ghế ${ghe.soGhe}`);
        } else {
            dispatch({ type: CHON_GHE, payload: [...arrPicked, ghe] });
        }
    };

    let renderDanhSachGhe = (arr) => {
        return arr.map((item, index) => (
            <tr key={index}>
                <td className="rowNumber">{item.hang}</td>
                {item.danhSachGhe.map((ghe, gheIndex) => (
                    <td key={gheIndex}>
                        <div
                            onClick={() => {
                                handleChonGhe(ghe);
                            }}
                            className={`chair 
                    ${item.hang === "" ? "rowNumber" : ""} 
                    ${ghe.daDat === true ? "wasPicked" : ""} 
                    ${arrPicked.includes(ghe) ? "nowPick" : ""}`}
                        >
                            {item.hang !== "" ? ghe.soGhe.slice(1) : ghe.soGhe}
                        </div>
                    </td>
                ))}
            </tr>
        ));
    };

    return <tbody>{renderDanhSachGhe(arrChair)}</tbody>;
}

export default memo(DanhSachGhe);
