import styled from "styled-components";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export const DateRange = styled(RangePicker)`
  .ant-picker-dropdown
    > .ant-picker-range-wrapper
    > .ant-picker-panel-container
    > .ant-picker-panel-layout
    > .ant-picker-panels {
    display: none !important;
    background-color: red;
  }
`;
