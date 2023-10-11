import bgBooking from "./bgmovie.jpg";
import "./style.css";
import DanhSachGhe from "./DanhSachGhe";
import ThanhToan from "./ThanhToan";

export default function DatVe() {
    return (
        <div className="main-content">
            <div className="overplay"></div>
            <div
                className="booking-background"
                style={{
                    backgroundImage: `url(${bgBooking})`,
                    backgroundSize: "cover",
                }}
            ></div>

            <div className="container">
                <div className="row">
                    <div className="col-8 booking-content text-center">
                        <h2>Đặt vé xem phim</h2>
                        <div className="screen">Màn hình</div>
                        <table className="table chairList">
                            <DanhSachGhe />
                        </table>
                    </div>

                    <div className="col-4 booking-checkout ">
                        <ThanhToan />
                    </div>
                </div>
            </div>
        </div>
    );
}
