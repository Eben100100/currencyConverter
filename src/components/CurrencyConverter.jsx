import { useEffect, useState } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [inputCur, setInputCur] = useState("USD");
  const [outputCur, setOutputCur] = useState("EUR");
  const [convertedCur, setConvertedCur] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${inputCur}&to=${outputCur} `
        );
        if (!res.ok) throw new Error("Can not fetch data");

        const data = await res.json();
        setConvertedCur(data.rates[outputCur]);
      } catch (err) {
        setError(err.message);
      } finally {
        setError("");
      }
    };
    fetchData();
  }, [inputCur, outputCur, amount]);

  return (
    <div className="container">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <select value={inputCur} onChange={(e) => setInputCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
      </select>
      <select value={outputCur} onChange={(e) => setOutputCur(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>

      {error && <p style={{ color: "red" }}> 💥💥 {error} 💥💥 </p>}
      {!error && <p> {convertedCur} </p>}
    </div>
  );
}

export default CurrencyConverter;
