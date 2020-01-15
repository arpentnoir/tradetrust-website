import React from "react";
import { mount } from "enzyme";
import TokenSideBarField from "./TokenSideBarField";

describe("tokenSideBarField", () => {
  it("should show the correct title", () => {
    const wrapper = mount(<TokenSideBarField title="Transfer Ownership" ctaText="" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Transfer Ownership");
  });

  it("should show the correct button text, should contain 1 button", () => {
    const wrapper = mount(<TokenSideBarField title="" ctaText="Transfer" />);
    expect(wrapper.find("button").text()).toStrictEqual("Transfer");
    expect(wrapper.find("button")).toHaveLength(1);
  });

  // // to uncomment this test once stylemock for jestconfig PR is merged
  // it("should show the correct color button", () => {
  //   let wrapper = mount(<TokenSideBarField title="" ctaText="" ctaStatus="danger" />);
  //   expect(wrapper.find("button").hasClass("button-danger")).toBe(true);

  //   wrapper = mount(<TokenSideBarField title="" ctaText="" ctaStatus="success" />);
  //   expect(wrapper.find("button").hasClass("button-success")).toBe(true);
  // });
});