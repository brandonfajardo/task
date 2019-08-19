import { css } from 'styled-components'

export const lighterGray = '#e3e3e3'
export const lightGray = 'lightgray'
export const primaryBlue = '#297bbf'
export const white = 'white'
export const black = 'black'
export const overlay = 'rgba(59, 59, 59, 0.65)'
export const error = '#ea5351'
export const success ='#59af50'
export const red = '#e53344'
export const orange = '#e58639'
export const yellow = '#e5e474'

export const colorProps = css`
  color: ${props => 
    props.white ? white 
        : props.error ? error 
            : props.success ? success
                : black}
`
