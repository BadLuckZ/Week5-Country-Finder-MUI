import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, Divider, Typography } from "@mui/material";

export default function CountryDetail() {
  const location = useLocation();
  console.log(location);
  // Link Component สามารถส่ง state ได้

  // เมื่อคลิก CountryDetail useLocation() จะ render ข้อมูลก่อนที่ page จะ render
  // จากเดิมที่ต้องรอ page render ก่อนจึงจะ render ข้อมูล
  // ทำให้เมื่อ page render เสร็จ page นั้นจะมาพร้อมข้อมูลเลย ไม่เป็น page เปล่าๆ ที่กำลังรอการ render ข้อมูล

  // แต่หาก Lifehack ด้วยการพิมพ์ Link โดยตรงเลย = ก็ต้องหาข้อมูลใหม่อยู่แล้ว เรื่องปกติ

  const { countryName } = useParams();
  const [country, setCountry] = useState(location.state || null);
  useEffect(() => {
    async function fetchCountry() {
      fetch("https://restcountries.com/v3.1/name/" + countryName)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw Error("Fail to Fetch");
        })
        .then((data) => {
          setCountry(data[0]);
        });
    }
    if (!country) {
      fetchCountry();
    }
  }, [country]);

  return (
    <>
      {!country ? (
        <div>Loading...</div>
      ) : (
        <main
          style={{
            maxWidth: 400,
            margin: "auto",
          }}
        >
          <Button component={Link} to="/" sx={{ marginTop: "1rem" }}>
            All countries
          </Button>
          <Divider sx={{ marginBlock: "1rem" }} />
          <Typography
            variant="h1"
            sx={{
              fontSize: "3rem",
              fontWeight: 500,
              marginTop: "0.5rem",
            }}
          >
            {country.name.common}
          </Typography>
          <Typography variant="overline" sx={{ marginBottom: "1rem" }}>
            {country.region}
          </Typography>

          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            width="100%"
            style={{ aspectRatio: 2 }}
          />
          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "1rem" }}
          >
            Capital
          </Typography>
          <ul>
            {country.capital
              ? country.capital?.map((item) => <li key={item}>{item}</li>)
              : "-"}
          </ul>

          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "1rem" }}
          >
            Timezones
          </Typography>
          <ul>
            {country.timezones
              ? country.timezones?.map((item) => <li key={item}>{item}</li>)
              : "-"}
          </ul>

          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "1rem" }}
          >
            Borders
          </Typography>
          <ul>
            {country.borders
              ? country.borders?.map((item) => <li key={item}>{item}</li>)
              : "-"}
          </ul>
        </main>
      )}
    </>
  );
}
