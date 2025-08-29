const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

  const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
  
  let dropdown = document.querySelectorAll(".dropdown select")

  let btn = document.querySelector("form button");
  let fromCurr = document.querySelector(".from select");
  let toCurr = document.querySelector(".to select");
  let msg = document.querySelector(".msg");

  for (let select of dropdown){
    for (CurrCode in countryList){
      console.log(CurrCode, countryList[CurrCode]);
      let newOpt = document.createElement("option");
      newOpt.innerText = CurrCode;
      newOpt.value = CurrCode;
      // if(select.name === "from" && CurrCode === "USD" ){
      //   newOpt.selected = "selected";
      // }
      // else if(select.name === "to" && CurrCode === "INR"){
      //   newOpt.selected = "selected";
      // }
      select.append(newOpt);
    }
    select.addEventListener("change", (evt)=>{
      updateFlag(evt.target)
    })
    

  }

  let updateFlag =(element)=>{
    let CurrCode = element.value;
    let countryCode = countryList[CurrCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    let msg = document.querySelector(".msg");
    img.src = newSrc
  }


  btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amVal = amount.value || 1; // Default to 1 if input is empty

    let fromCurrency = fromCurr.value.toLowerCase();
    let toCurrency = toCurr.value.toLowerCase();

    // Correct API URL
    let URL = `${Base_URL}${fromCurrency}.json`;

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        let exchangeRate = data[fromCurrency][toCurrency];

        if (!exchangeRate) {
            throw new Error("Invalid currency conversion");
        }

        let convertedAmount = (amVal * exchangeRate).toFixed(2);
        msg.innerText = `${amVal} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }

    
});
