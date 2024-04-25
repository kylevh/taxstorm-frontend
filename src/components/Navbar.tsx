import { Header, NavDropDownButton, Menu, Title, NavMenuButton, PrimaryNav, Search,  } from '@trussworks/react-uswds';
import { useState } from 'react';
import '@trussworks/react-uswds/lib/index.css';

function Navbar() {
    const [expanded, setExpanded] = useState(false);
    const onClick = (): void => setExpanded(prvExpanded => !prvExpanded);
    const testMenuItems = [<a href="#linkOne" key="one">
        Current link
    </a>, <a href="#linkTwo" key="two">
        Simple link Two
    </a>];
    const [isOpen, setIsOpen] = useState([false, false]);
    const testItemsMenu = [<>
        <NavDropDownButton menuId="testDropDownOne" onToggle={(): void => {
            onToggle(0, setIsOpen);
        }} isOpen={isOpen[0]} label="Nav Label" isCurrent={true} />
        <Menu key="one" items={testMenuItems} isOpen={isOpen[0]} id="testDropDownOne" />
    </>, <a href="#two" key="two" className="usa-nav__link">
        <span>Parent link</span>
    </a>, <a href="#three" key="three" className="usa-nav__link">
        <span>Parent link</span>
    </a>];

    return (
        <>
            <Header basic={true} showMobileOverlay={expanded}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>Project Title</Title>
                        <NavMenuButton onClick={onClick} label="Menu" />
                    </div>
                    <PrimaryNav items={testItemsMenu} mobileExpanded={expanded} onToggleMobileNav={onClick}>
                        <Search size="small" onSubmit={() => {}} />
                    </PrimaryNav>
                </div>
            </Header>
        </>
    )
}

export default Navbar;
