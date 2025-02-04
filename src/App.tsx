import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { parsePhoneNumber } from "libphonenumber-js";
import Input from 'react-phone-number-input/input'
import PropTypes from 'prop-types'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en'

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
  <select
    {...rest}
    value={value}
    onChange={event => onChange(event.target.value || undefined)}>
    <option value="">
      {labels['ZZ']}
    </option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {'Logo'} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
)

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired
}

const PhoneNumberComponent: React.FC = () => {
  const [phone, setPhone] = useState<string | undefined>("");
  const [value, setValue] = useState<string | undefined>("");
  const [country, setCountry] = useState<string | undefined>("");

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
  };

  const getCountryAndNumber = () => {
    if (!phone) return { countryCode: "", nationalNumber: "" };

    const parsedNumber = parsePhoneNumber(phone);
    if (parsedNumber) {
      return {
        countryCode: `+${parsedNumber.countryCallingCode}`,
        nationalNumber: parsedNumber.nationalNumber,
      };
    }
    return { countryCode: "", nationalNumber: "" };
  };

  const { countryCode, nationalNumber } = getCountryAndNumber();

  return (
    <div>
      <CountrySelect
        labels={en}
        value={country}
        onChange={setCountry} />


      <Input
        country="IN"
        value={value}
        onChange={setValue} />

      <div>
        <p>Country Code: {countryCode}</p>
        <p>Phone Number: {nationalNumber}</p>
      </div>
    </div>
  );
};

export default PhoneNumberComponent;
