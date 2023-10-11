import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { THANH_TOAN, XOA_GHE } from "../redux/constant/datVeConst";
import { message } from "antd";

export default function ThanhToan() {
    const arrPicked = useSelector((state) => state.datVeReducer.arrPicked);
    const arrChair = useSelector((state) => state.datVeReducer.arrChair);

    let dispatch = useDispatch();

    let handleDeleteChair = (ghe) => {
        dispatch({
            type: XOA_GHE,
            payload: arrPicked.filter((g) => g !== ghe),
        });
        message.success(`Bạn đã xóa ghế ${ghe.soGhe}!`);
    };

    let renderThanhToan = () => {
        return arrPicked.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.soGhe}</td>
                    <td>{item.gia.toLocaleString("vi")}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                handleDeleteChair(item);
                            }}
                        >
                            X
                        </button>
                    </td>
                </tr>
            );
        });
    };

    let handleThanhToan = (arrPicked) => {
        if (arrPicked.length !== 0) {
            let updatedArrChair = [...arrChair];

            let updatedArrPicked = arrPicked.map((item) => {
                updatedArrChair.forEach((chair) => {
                    chair.danhSachGhe.forEach((ghe) => {
                        if (ghe.soGhe === item.soGhe) {
                            ghe.daDat = true;
                        }
                    });
                });

                return {
                    ...item,
                    daDat: true,
                };
            });

            dispatch({
                type: THANH_TOAN,
                payload: {
                    arrPaid: updatedArrPicked,
                    arrChair: updatedArrChair,
                },
            });
            message.success("Bạn đã thanh toán thành công!");
        } else {
            message.error("Hãy chọn ghế trước khi bấm thanh toán!");
        }
    };

    let tongTien = arrPicked.reduce((sum, chairPicked) => {
        return sum + chairPicked.gia;
    }, 0);

    return (
        <div>
            <h3>Thanh toán vé</h3>
            <div>
                <span className="d-inline-block chair m-0"></span>
                <span className="d-inline-block ml-2">Ghế chưa đặt</span>
            </div>
            <div>
                <span className="d-inline-block chair wasPicked m-0"></span>
                <span className="d-inline-block ml-2">Ghế đã đặt</span>
            </div>
            <div>
                <span className="d-inline-block chair nowPick m-0"></span>
                <span className="d-inline-block ml-2">Ghế đang chọn</span>
            </div>
            <table className="table text-white mt-3">
                <thead>
                    <tr>
                        <th>Số ghế</th>
                        <th>Giá</th>
                        <th>Hủy</th>
                    </tr>
                </thead>
                <tbody>
                    {renderThanhToan()}
                    <tr>
                        <th>Tổng tiền:</th>
                        <td>{tongTien.toLocaleString("vi")}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <button
                className="btn btn-success"
                onClick={() => {
                    handleThanhToan(arrPicked);
                }}
            >
                Thanh toán
            </button>
        </div>
    );
}
