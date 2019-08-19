import styled from 'styled-components'

export const justifyCenter = `
  justify-content: center;
`

export const flexDirectionColumn = `
  flex-direction: column;
`

export const spaceBetween = `
  justify-content: space-between;
`


export const Flex = styled.div`
  display: flex;
  ${props => props.column && flexDirectionColumn};
  ${props => props.justifyCenter && justifyCenter};
  ${props => props.spaceBetween && spaceBetween};
`
