import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";

export default function CountryDetail() {
  const navigate = useNavigate();
  const { countryName } = useParams();
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/" + countryName)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error("Fail to Fetch");
      })
      .catch((err) => {
        setLoading(true);
        setCountry(null);
      })
      .then((data) => {
        setLoading(true);
        setCountry(data[0]);
      });
  }, []);
  return (
    <>
      {loading ? (
        <main
          style={{
            maxWidth: 400,
            margin: "auto",
          }}
        >
          <Button
            sx={{ marginTop: "1rem" }}
            onClick={() => {
              navigate("/");
            }}
          >
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
