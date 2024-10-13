import React, { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  MenuItem,
  Button,
  Divider,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  List,
  ListItem,
  Skeleton,
  ListItemAvatar,
} from "@mui/material";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("eng");
  const [offline, setOffline] = useState(false);
  const [countryDetail, setCountryDetail] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } finally {
        setLoading(false);
      }
    }
    if (!countries.length) {
      fetchData();
    }
  }, [countries]);
  useEffect(() => {
    function handleOffline() {
      setOffline(true);
    }
    function handleOnline() {
      setOffline(false);
    }
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  if (countryDetail) {
    return (
      <main
        style={{
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <Button
          sx={{ marginTop: "1rem" }}
          onClick={() => setCountryDetail(null)}
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
          {countryDetail.name.common}
        </Typography>
        <Typography variant="overline" sx={{ marginBottom: "1rem" }}>
          {countryDetail.region}
        </Typography>

        <img
          src={countryDetail.flags.svg}
          alt={countryDetail.flags.alt}
          width="100%"
          style={{ aspectRatio: 2 }}
        />
        <Typography variant="h3" sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          Capital
        </Typography>
        <ul>
          {countryDetail.capital
            ? countryDetail.capital?.map((item) => <li key={item}>{item}</li>)
            : "-"}
        </ul>

        <Typography variant="h3" sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          Timezones
        </Typography>
        <ul>
          {countryDetail.timezones
            ? countryDetail.timezones?.map((item) => <li key={item}>{item}</li>)
            : "-"}
        </ul>

        <Typography variant="h3" sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          Borders
        </Typography>
        <ul>
          {countryDetail.borders
            ? countryDetail.borders?.map((item) => <li key={item}>{item}</li>)
            : "-"}
        </ul>
      </main>
    );
  }
  return (
    <main
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: 500,
          marginTop: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        Country Finder
      </Typography>
      {offline && (
        <div
          style={{
            backgroundColor: "antiquewhite",
            padding: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          ⚠️ You are offline. Please check your internet connection.
        </div>
      )}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <TextField
          label="Search country"
          placeholder="Type to find..."
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          style={{
            flex: "auto",
          }}
        />
        <FormControl
          sx={{
            minWidth: 82,
          }}
        >
          <InputLabel id="language-select">Language</InputLabel>
          <Select
            label="Language"
            labelId="language-select"
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
          >
            <MenuItem value="eng">eng</MenuItem>
            <MenuItem value="ara">ara</MenuItem>
            <MenuItem value="fra">fra</MenuItem>
            <MenuItem value="ita">ita</MenuItem>
            <MenuItem value="jpn">jpn</MenuItem>
            <MenuItem value="zho">zho</MenuItem>
          </Select>
        </FormControl>
      </div>
      {loading ? (
        <List sx={{ mt: "1rem" }}>
          {[...Array(30)].map((_, index) => (
            <ListItem key={index}>
              <Skeleton
                sx={{ width: `${Math.floor(Math.random() * 61) + 40}%` }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          <List sx={{ marginTop: "1rem" }}>
            {countries
              .filter((country) =>
                (
                  country.translations[language]?.official ||
                  country.name.official
                ).includes(text)
              )
              .map((country) => {
                const name =
                  country.translations[language]?.official ||
                  country.name.official;
                const elements = text ? name.split(text) : [name];
                return (
                  <ListItem
                    key={country.name.official}
                    sx={{
                      whiteSpace: "pre",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      {country.flag}
                    </ListItemAvatar>
                    <Typography
                      component="button"
                      noWrap
                      sx={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => {
                        setCountryDetail(country);
                      }}
                    >
                      {elements.map((elm, index) =>
                        index === 0 ? (
                          elm
                        ) : (
                          <React.Fragment key={index}>
                            <span
                              style={{
                                backgroundColor: "lightblue",
                                color: "darkblue",
                              }}
                            >
                              {text}
                            </span>
                            {elm}
                          </React.Fragment>
                        )
                      )}
                    </Typography>
                  </ListItem>
                );
              })}
          </List>
        </>
      )}
    </main>
  );
}

export default App;
