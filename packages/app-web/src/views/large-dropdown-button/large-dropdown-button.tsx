
import './large-dropdown-button.scss'
import { createContext, ConsumerProps, ReactNode } from 'react'
import ButtonView from '../button/button'
import IconView, { Icon } from '../../views/icon/icon'
import { renderClassName } from '../../lib/utils/dom'

interface DropDownState {
  open: boolean
}

interface LargeDropDownButtonPayload extends ConsumerProps<DropDownState> {
  /**
   * Icon is optional and can be supplemented via the children prop using IconView
   */
  icon?: Icon
}

const defaultDropDownState: DropDownState = {
  open: true
} 

const DropDownContext = createContext(defaultDropDownState)

function LargeDropDownButtonView(props: LargeDropDownButtonPayload): JSX.Element {
  const { children, icon } = props
  // const [openState, setOpenState] = useState(true);

  return (
    <ButtonView modifiers={['large']}>
      <span className='large-dropdown-button'>
        {/* {children} {icon !== undefined ? <IconView icon={icon} /> : <></>} */}
        <DropDownContext.Provider value={defaultDropDownState}>
          <DropDownContext.Consumer>
            {children}
          </DropDownContext.Consumer>
          <DropDownContext.Consumer>
            {({ open }) => (
              icon !== undefined
              ? <span className={renderClassName('large-dropdown-button-icon', open ? ["flipped"] : [])}>
                  <IconView icon={icon} />
                </span>
              : <></>
            )}
          </DropDownContext.Consumer>
        </DropDownContext.Provider>
      </span>
    </ButtonView>
  )
}

export default /* Object.assign(LargeDropDownButtonView) */ LargeDropDownButtonView;