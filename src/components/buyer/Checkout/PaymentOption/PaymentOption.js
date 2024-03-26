"use client"
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  theme,
  Checkbox,
  Form,
  Input,
  DatePicker,
  
} from "antd";

const { Header, Sider, Content } = Layout;

export default function PaymentOption
() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1"); // State to track selected menu item

  const {
    token: { borderRadiusLG, siderBg },
  } = theme.useToken();

  // Function to handle menu item click
  const handleMenuItemClick = (key) => {
    setSelectedMenuItem(key);
  };

  return (
    <>
    
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          
          style={{ display: "flex", flexDirection: "column" ,height:"42vh"}}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{ backgroundColor: siderBg,  }}
            className="bg-[#d4d0c9]"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedMenuItem]}
            theme="light"
            onClick={({ key }) => handleMenuItemClick(key)}
          >
    
          <Menu.Item
              key="1"
              label="Credit/Debit Card"
              
              style={selectedMenuItem === "1" ? { backgroundColor: "white", height: "10%",color: "black" ,borderRadius:"none"} : {}}
              // Set height for Credit/Debit Card item
            >
              Credit/Debit Card
            </Menu.Item>
            <Menu.Item
              key="2"
              label="UPI"
              className="w-10vh"
              style={selectedMenuItem === "2" ? { backgroundColor: "white", color: "black" ,borderRadius:"none"} : {}}
            >
              UPI
            </Menu.Item>
          </Menu>
          <Header className="w-full">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
             
            />
          </Header>
        </Sider>
        <Layout>
          <Content
            className="w-full"
            style={{
              margin: "0px 0px 0px 18px",
              width: 500,
              height: 300,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Render content based on selected menu item */}
            {selectedMenuItem === "1" && (
              <div>
                <Form
                  name="basic"
                  layout="vertical"
                  labelCol={{ span: 8 }}
                  initialValues={{ remember: true }}
                  className="font-semibold border border-[#a8eb33] pl-5 pt-5 pr-5 h-[41vh] rounded-lg "
                >
                  <Form.Item
                    label="Card Number"
                    name="Card-Number"
                    rules={[
                      { required: true, message: "Enter your card number" },
                    ]}
                  >
                    <Input
                      className="border-none"
                      placeholder="Enter Card Number"
                    />
                    <hr/>
                  </Form.Item>
                  <Row gutter={10} >
                    <Col span={12}>
                      <Form.Item
                        label="Validity"
                        name="Valid Thru"
                        rules={[
                          {
                            required: true,
                            message: "Please input your validity period",
                          },
                        ]}
                      >
                        <DatePicker
                          className="border-none hover:bg-none w-[93%]"
                          placeholder="MM-YY"
                          
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="CVV"
                        name="CVV"
                        rules={[
                          {
                            required: true,
                            message: "Enter Your Security code",
                          },
                        ]}
                      >
                        <Input className="border-none hover:bg-none hover:border-none" placeholder="Enter Your Security code"/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <hr/>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    
                  >
                    <Checkbox>
                      Save this card for faster payments
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" className="bg-red-500 text-white w-full h-[5vh]">Place order & Pay</Button>
                  </Form.Item>
                </Form>
              </div>
            )}
            {selectedMenuItem === "2" && <div>  <Form
                  name="basic"
                  layout="vertical"
                  labelCol={{ span: 8 }}
                  initialValues={{ remember: true }}
                  className="border border-[#a8eb33] pl-5 pt-5 h-[41vh] rounded-lg "
                >
                  <h1 className="font-semibold">Add a UPI</h1>
                  <Form.Item
                  label="UPI ID"
                    name="UPI-ID"
                    rules={[
                      { required: true, message: "Enter your card number" },
                    ]}
                  >
                    <Input
                      className="border-none"
                      placeholder="user@bankname"
                    />
                    <hr/>
                    <p className="mt-3">A payment request will  be sent to this UPI ID</p>
                  </Form.Item></Form></div>}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}