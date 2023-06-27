import React, { Component } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateKey from "../components/CreateKey";
import Sign from "../components/Sign";
import Verify from "../components/Verify";

class MainLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row content">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h1 className="title">KMA JSON Signature Tool</h1>
                            <p>
                                Công cụ ký số phía máy khách trực tuyến đơn giản và an toàn. Tạo chữ ký số của bạn dưới dạng JWS, ký số và kiểm tra chữ ký số dễ dàng chỉ bằng một vài cú nhấp chuột.
                            </p>
                        </div>
                        <div className="tabable">
                            <Tabs
                                defaultActiveKey="sign"
                                id="tabable"
                                className=""
                            >
                                <Tab eventKey="sign" title="Ký số">
                                    <Sign />
                                </Tab>
                                <Tab eventKey="verify" title="Kiểm tra chữ ký">
                                    <Verify />
                                </Tab>
                                <Tab eventKey="create_key" title="Tạo khóa">
                                    <CreateKey />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainLayout;
