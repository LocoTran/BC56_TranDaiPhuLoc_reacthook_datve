import { CHON_GHE, THANH_TOAN, XOA_GHE } from "../constant/datVeConst";
import data from "../../DatVe/danhSachGhe.json";

let initialState = {
    arrChair: [...data],
    arrPicked: [],
    arrPaid: [],
};

export let datVeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHON_GHE: {
            return {
                ...state,
                arrPicked: payload,
            };
        }

        case XOA_GHE: {
            return {
                ...state,
                arrPicked: payload,
            };
        }

        case THANH_TOAN: {
            return {
                ...state,
                arrChair: payload.arrChair,
                arrPicked: [],
                arrPaid: payload.arrPaid,
            };
        }

        default:
            return state;
    }
};
