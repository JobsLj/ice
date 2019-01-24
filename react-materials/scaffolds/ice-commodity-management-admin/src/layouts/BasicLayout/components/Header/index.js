import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import { headerMenuConfig } from '../../../../menuConfig';
import './index.scss';

@withRouter
export default class Header extends Component {
  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="header-navbar">
          <Menu
            className="header-navbar-menu"
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            mode="horizontal"
          >
            {headerMenuConfig &&
              headerMenuConfig.length > 0 &&
              headerMenuConfig.map((nav, index) => {
                if (nav.children && nav.children.length > 0) {
                  return (
                    <SubMenu
                      triggerType="click"
                      key={index}
                      title={
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          <span>{nav.name}</span>
                        </span>
                      }
                    >
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.external) {
                          if (item.newWindow) {
                            linkProps.target = '_blank';
                          }

                          linkProps.href = item.path;
                          return (
                            <MenuItem key={item.path}>
                              <a {...linkProps}>
                                <span>{item.name}</span>
                              </a>
                            </MenuItem>
                          );
                        }
                        linkProps.to = item.path;
                        return (
                          <MenuItem key={item.path}>
                            <Link {...linkProps}>
                              <span>{item.name}</span>
                            </Link>
                          </MenuItem>
                        );
                      })}
                    </SubMenu>
                  );
                }
                const linkProps = {};
                if (nav.external) {
                  if (nav.newWindow) {
                    linkProps.target = '_blank';
                  }
                  linkProps.href = nav.path;
                  return (
                    <MenuItem key={nav.path}>
                      <a {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          {nav.name}
                        </span>
                      </a>
                    </MenuItem>
                  );
                }
                linkProps.to = nav.path;
                return (
                  <MenuItem key={nav.path}>
                    <Link {...linkProps}>
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol size="small" type={nav.icon} />
                        ) : null}
                        {nav.name}
                      </span>
                    </Link>
                  </MenuItem>
                );
              })}
          </Menu>
        </div>
      </div>
    );
  }
}