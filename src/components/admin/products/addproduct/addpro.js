"use client";
import React, { useState } from "react";
// import Status from "./status";
import Link from "next/link";
import { CreateProduct } from "@/Api/createProducts";
import { createProducts } from "../../../../redux/slices/addProductSlice";
import { useDispatch } from "react-redux";
import { Form, Input,Button, message, Upload, Col, Select, DatePicker } from "antd";
import { setCreateProduct } from "../../../../redux/slices/addProductSlice";

import {ArrowLeftOutlined,LoadingOutlined,PlusOutlined,} from "@ant-design/icons";
// import UploadMediafun from "./uploadMedia";
// import Pricing from "./pricing";
// import Publishing from "./publishing";
import { useRouter } from "next/navigation";
// import Producttitle from "./producttitle";

//uploadimage code
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  // if (!isJpgOrPng) {
  //   message.error("You can only upload JPG/PNG file!");
  // }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isLt2M;
};
const { TextArea } = Input;
// publishing form code
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const config = {
  rules: [
    {
      type: "object",
      message: "Please select time!",
    },
  ],
};
const Addproduct = () => {
  // image uploading code
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  // publishing form code
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      "date-time-picker": fieldsValue["date-time-picker"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };
    console.log("Received values of form: ", values);
  };
  //redux code
  const [formData, setFormData] = useState({
    category:"",
    // image:"",
    name: "",
    price:"",
    unit:"",
    description: "",
    id:"1123"
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    console.log(formData)
    // dispatch(setCreateProduct({ ...formData, image: imageUrl }));
    // CreateProduct(formData.id,formData.name,formData.description,formData.unit,formData.category,formData.price)
    dispatch(createProducts({ ...formData, image: imageUrl }))
    // dispatch(setCreateProduct(formData));
  };
  const backToProducts = () => {
    router.push("/admin/products");
  };
  const router = useRouter();
  return (
    <div className="p-8 flex flex-col ">
      <header className="flex gap-5">
        <ArrowLeftOutlined
          className="text-lg font-semibold"
          onClick={backToProducts}
        />
        <h1 className="font-bold text-2xl">Add Product</h1>
      </header>
      <main className="flex gap-8 justify-center">
        <sectionleft className="w-[50%]">
          {/* title and description form  */}
          <Form
            requiredMark={false}
            className="border-2 font-semibold bg-white w-full shadow-md px-8 py-5 rounded-xl"
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              label="Title"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Title of the product!",
                },
              ]}
            >
              <Input
                name="name"
                placeholder="Short sleeve t-shirt"
                className="border border-black"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea
                name="description"
                rows={5}
                className="border border-black"
                placeholder="Mention the description of your Product here!"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>

          {/* image upload code */}

          {/* <UploadMediafun /> */}
          {/* upload media code */}
          <div className="border-2 shadow-md h-[12rem] w-full  bg-white px-8 pt-3 mt-5 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Media</h1>
            <div className="pl-[40%]">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <p className="pl-[30%]">Accepts images of type PNG/JPEG</p>
          </div>

          {/* <Pricing /> */}
          {/* pricing form code */}
          <div className="border-2 shadow-md w-full h-[18rem] bg-white px-8 pt-3 mt-5 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Pricing</h1>
            <Form
              requiredMark={false}
              layout="vertical"
              labelCol={{
                span: 20,
              }}
            >
              <Col>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please input Category!",
                    },
                  ]}
                >
                  <Input
                    name="category"
                    placeholder="Category"
                    className="border border-black"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[
                    {
                      required: true,
                      message: "Please input Unit!",
                    },
                  ]}
                >
                  <Input
                    name="unit"
                    placeholder="Unit"
                    className="border border-black"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input Price!",
                    },
                  ]}
                >
                  <Input
                    name="price"
                    placeholder="Price"
                    className="border border-black"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Form>
          </div>
        </sectionleft>
        <sectionright className="w-[25%]">
          {/* <Status /> */}
          {/* status form code */}
          <div className="border-2 shadow-md h-[6.75rem] bg-white px-8 pt-3 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Status</h1>{" "}
            <Form className="mt-2 border-black">
              {" "}
              <Form.Item>
                <Select>
                  <Select.Option value="demo">Active</Select.Option>{" "}
                  <Select.Option value="demo">Draft</Select.Option>{" "}
                </Select>{" "}
              </Form.Item>
            </Form>
          </div>
          {/* <Publishing /> */}
          <div className="border-2 shadow-md h-[20rem] bg-white px-8 pt-3 mt-5 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Publishing</h1>
            <p className="font-semibold">Sales channels</p>

            <ul>
              <li type="circle">
                Online Store
                <Form
                  name="time_related_controls"
                  {...formItemLayout}
                  onFinish={onFinish}
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    labelWrap
                    name="date-time-picker"
                    label="Schedule"
                    {...config}
                  >
                    <DatePicker
                      showTime={{ format: "HH:mm:ss" }}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Enter the date and time"
                    />
                  </Form.Item>
                </Form>
              </li>
              <li type="circle">
                Point of Sale
                <p>
                  Point of Sale has not been set up. Finish the remaining steps
                  to start selling in person.
                </p>
              </li>
              <Link href="/" className="text-blue-600 underline">
                Learn more
              </Link>
            </ul>
            <br />
            <p className="font-semibold">Markets</p>
            <ul>
              <li type="circle">India and International</li>
            </ul>
          </div>
        </sectionright>
      </main><br/><br/>
      <div className="flex">
        <Button
          type="primary"
          style={{
            color: "white",
            backgroundColor: "black",
            borderRadius: "5px",
            // padding: "8px 0px 0px 90px",
            width: "40%",
          }}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default Addproduct;
