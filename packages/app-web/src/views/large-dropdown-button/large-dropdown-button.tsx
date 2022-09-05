
import './large-dropdown-button.scss'
import { PropsWithChildren } from "react";
import ButtonView from "../button/button";
import IconView, { Icon } from "../../views/icon/icon";

interface LargeDropDownButtonPayload extends PropsWithChildren {
  /**
   * Icon is optional and can be supplemented via the children prop using IconView
   */
  icon?: Icon
}

export default function LargeDropDownButtonView(props: LargeDropDownButtonPayload) {
  const { children, icon } = props
  return (
    <ButtonView modifiers={["large"]}>
      <span className="large-dropdown-button">
        {children} {icon !== undefined ? <IconView icon={icon} /> : <></> }
      </span>
    </ButtonView>
  )
}