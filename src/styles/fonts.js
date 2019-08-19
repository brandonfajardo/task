import styled, { css } from 'styled-components'
import { colorProps, primaryBlue } from './colours'

// Sizes
export const h1Text = '40px'
export const h2Text = '22px'
export const h4Text = '16px'
export const bodyText = '14px'
export const smallText = '12px'

// Font weight
export const bold = 800

export const fontProps = css`
  ${colorProps};
  ${props => props.click && `
    cursor: pointer;
  `};
  font-weight: ${props => props.bold && bold};
  text-align: ${props => props.center && `center`};
  text-align: ${props => props.right && `right`};
  ${props => props.hover && `
    &:hover {
        color: ${primaryBlue};
    }
  `};
`

export const H1 = styled.h1`
    ${fontProps};
    font-size: ${h1Text};
`

export const H2 = styled.h2`
    ${fontProps};
    font-size: ${h2Text};
`

export const H4 = styled.h4`
    ${fontProps};
    font-size: ${h4Text};
`

export const P = styled.p`
  ${fontProps};
  font-size: ${bodyText};
`

export const SmallText = styled.p`
    ${fontProps};
    font-size: ${smallText};
`