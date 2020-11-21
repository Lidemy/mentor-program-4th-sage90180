import styled from "styled-components";
import { useState, useEffect } from "react";

const FormWrap = styled.div``;
const FormTitle = styled.h1``;
const FormIntro = styled.p``;
const FormMain = styled.form``;
const FormInput = ({
  className,
  label,
  type,
  name,
  content,
  value,
  onChange,
}) => (
  <label className={className}>
    {label}
    <input type={type} name={name} onChange={onChange} value={value} />
    <div className="warning">{content}</div>
  </label>
);

function Form() {
  const [getErrorMessage, setGetErrorMessage] = useState(null);
  const [data, setData] = useState(() => {
    let formData = window.localStorage.getItem("data") || "";
    if (formData) {
      formData = JSON.parse(formData);
      return formData;
    } else {
      return (formData = {
        nickname: "",
        email: "",
        phone: "",
        type: "",
        knowAboutUs: "",
        others: "",
      });
    }
  });

  const saveToLocalStorage = (data) => {
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let getAlert = true;
    for (var question in data) {
      if (question !== "others" && data[question] === "") {
        getAlert = false;
        setGetErrorMessage(true);
      }
    }
    if (getAlert) {
      alert(`----------資 料 成 功 送 出----------
暱       稱：${data.nickname}
信       箱：${data.email}
手       機：${data.phone}
報名項目：${data.type === 1 ? "躺在床上用想像力實作" : "趴在地上滑手機找現成的"}
資訊來源：${data.knowAboutUs}
其       它：${data.others}
------------------------------------
        `);
    }
  };

  useEffect(() => {
    saveToLocalStorage(data);
  }, [data]);

  return (
    <FormWrap className="form_box">
      <FormTitle>新拖延運動報名表單</FormTitle>
      <FormIntro>活動日期：2020/12/10 ~ 2020/12/11</FormIntro>
      <FormIntro>活動地點：台北市大安區新生南路二段1號</FormIntro>
      <FormMain onSubmit={handleSubmit} className="form_main">
        <FormInput
          className="form_title necessary"
          value={data.nickname}
          label="暱稱"
          type="text"
          name="nickname"
          content={!data.nickname && getErrorMessage && "請輸入暱稱"}
          onChange={handleInputChange}
        />
        <FormInput
          className="form_title necessary"
          value={data.email}
          label="電子信箱"
          type="text"
          name="email"
          content={!data.email && getErrorMessage && "請輸入電子郵件"}
          onChange={handleInputChange}
        />
        <FormInput
          className="form_title necessary"
          value={data.phone}
          label="手機"
          type="text"
          name="phone"
          content={!data.phone && getErrorMessage && "請輸入手機號碼"}
          onChange={handleInputChange}
        />
        <label className="form_title necessary">
          報名類型
          <br />
          <input
            className="apply"
            id="opt_1"
            type="radio"
            name="type"
            value="1"
            onClick={handleInputChange}
            checked={data.type === "1" ? true : false}
            readOnly
          />
          <label className="apply" htmlFor="opt_1">
            躺在床上用想像力實作
          </label>
          <br />
          <input
            className="apply"
            id="opt_2"
            type="radio"
            name="type"
            value="2"
            onClick={handleInputChange}
            checked={data.type === "2" ? true : false}
            readOnly
          />
          <label className="apply" htmlFor="opt_2">
            趴在地上滑手機找現成的
          </label>
          {!data.type && getErrorMessage && (
            <div className="warning opt">請選擇</div>
          )}
        </label>
        <FormInput
          className="form_title necessary"
          value={data.knowAboutUs}
          label="怎麼知道這個活動的？"
          type="text"
          name="knowAboutUs"
          content={!data.knowAboutUs && getErrorMessage && "請輸入資訊"}
          onChange={handleInputChange}
        />
        <label className="form_title necessary">
          其它
          <br />
          <textarea
            value={data.others}
            rows="4"
            placeholder="對於活動的一些建議"
            name="others"
            onChange={handleInputChange}
          />
        </label>
        <button>送 出</button>
        <p className="ps">請勿透過表單送出您的密碼。</p>
      </FormMain>
    </FormWrap>
  );
}
export default Form;
