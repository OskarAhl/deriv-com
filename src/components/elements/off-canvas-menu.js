import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex } from 'components/containers'
import { LocalizedLink, localize } from 'components/localization'
import { Accordion, AccordionItem, NavCard } from 'components/elements'
import DTrader from 'images/svg/dtrader-icon.svg'
import DMT5 from 'images/svg/dmt5-icon.svg'
import DBot from 'images/svg/dbot-icon.svg'
import Smarttrader from 'images/svg/smarttrader.svg'

const OffCanvasMenu = styled.section`
    position: fixed;
    background-color: var(--color-white);
    top: 7.2rem;
    height: 100vh;
    width: 253px;
    opacity: 0.98;
    transition: left 0.4s;
    box-shadow: 0 16px 20px 0 rgba(0, 0, 0, 0.1);
    left: ${props => (props.is_canvas_menu_open ? '0' : '-253px')};
`
const StyledLink = styled(props => <LocalizedLink {...props} />)`
    color: var(--color-black);
    margin-top: 2.4rem;
    font-size: 2rem;
    font-weight: 400;
    text-decoration: none;
    line-height: 2.8rem;
`
const OffCanvasMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4rem 1.6rem;

    div {
        a:first-child {
            margin-top: 0;
        }
    }
`

const header_style = {
    border: 'none',
    padding: '0',
    boxShadow: 'none',
    flexDirection: 'row',
}
const content_style = {
    marginLeft: '1.6rem',
    marginBottom: '2.4rem',
    marginTop: '0.8rem',
}

const OffCanvasMenuWrapper = props => {
    const canvas = useRef()

    const handleArrowClick = () => {
        props.closeOffCanvasMenu()
    }

    const outerClick = e => {
        if (!canvas.current.contains(e.target)) {
            props.closeOffCanvasMenu()
        } else return
    }

    useEffect(() => {
        document.addEventListener('mousedown', outerClick, false)
        return () => {
            document.removeEventListener('mousedown', outerClick, false)
        }
    }, [])

    return (
        <OffCanvasMenu is_canvas_menu_open={props.is_canvas_menu_open} ref={canvas}>
            <OffCanvasMenuContainer>
                <Accordion>
                    <AccordionItem
                        header={localize('Trading platforms')}
                        header_style={header_style}
                        style={content_style}
                    >
                        <Flex mb="3.2rem">
                            <NavCard
                                icon={DTrader}
                                content={localize(
                                    'A whole new trading experience on a powerful yet easy to use platform. ',
                                )}
                                title={localize('DTrader')}
                                to="/dtrader"
                            />
                        </Flex>
                        <Flex mb="3.2rem">
                            <NavCard
                                icon={DBot}
                                content={localize(
                                    'Automated trading at your fingertips. No coding needed.',
                                )}
                                title={localize('DBot')}
                                to="/dbot"
                            />
                        </Flex>
                        <Flex mb="3.2rem">
                            <NavCard
                                icon={DMT5}
                                content={localize(
                                    'The platform of choice for professionals worldwide.',
                                )}
                                title={localize('DMT5')}
                                to="/dmt5"
                            />
                        </Flex>
                        <Flex>
                            <NavCard
                                icon={Smarttrader}
                                content={localize(
                                    'Trade the world’s markets with a simple and familiar platform. ',
                                )}
                                title={localize('SmartTrader')}
                                to="https://smarttrader.deriv.app"
                                external
                            />
                        </Flex>
                    </AccordionItem>
                    <AccordionItem
                        header={localize('Company')}
                        header_style={header_style}
                        style={content_style}
                    >
                        <StyledLink to="/about/" onClick={handleArrowClick}>
                            {localize('Why choose us')}
                        </StyledLink>
                        <StyledLink to="/about/#story" onClick={handleArrowClick}>
                            {localize('Our story')}
                        </StyledLink>
                        <StyledLink to="/about/#leadership" onClick={handleArrowClick}>
                            {localize('Our leadership')}
                        </StyledLink>
                        <StyledLink to="/help-centre/" onClick={handleArrowClick}>
                            {localize('Join us')}
                        </StyledLink>
                        <StyledLink to="/help-centre/" onClick={handleArrowClick}>
                            {localize('Contact us')}
                        </StyledLink>
                    </AccordionItem>
                    <AccordionItem
                        header={localize('Legal')}
                        header_style={header_style}
                        style={content_style}
                    >
                        <StyledLink to="/about/" onClick={handleArrowClick}>
                            {localize('About us')}
                        </StyledLink>
                        <StyledLink to="/help-centre/" onClick={handleArrowClick}>
                            {localize('Help Centre')}
                        </StyledLink>
                    </AccordionItem>
                </Accordion>
            </OffCanvasMenuContainer>
        </OffCanvasMenu>
    )
}
export const moveOffCanvasMenu = (initState = false) => {
    const [is_canvas_menu_open, setOffCanvasMenuPosition] = useState(initState)
    const openOffCanvasMenu = () => setOffCanvasMenuPosition(true)
    const closeOffCanvasMenu = () => setOffCanvasMenuPosition(false)

    return [is_canvas_menu_open, openOffCanvasMenu, closeOffCanvasMenu]
}

OffCanvasMenuWrapper.propTypes = {
    closeOffCanvasMenu: PropTypes.func,
    is_canvas_menu_open: PropTypes.bool,
}
export default OffCanvasMenuWrapper
