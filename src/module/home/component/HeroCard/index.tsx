import React from 'react'
import { HomeHeroInfo } from 'type/api'
import './index.less'

interface Props {
    onClick: () => void;
    hero: HomeHeroInfo;
}

// dss
class HeroCard extends React.PureComponent<Props, {}> {
  render () {
    const { hero } = this.props
    
    return (
      <div className="product-card" onClick={this.props.onClick}>
        <div className="product-head">
          <img src={hero.img} />
          <div className="product-logo">
            <img src={require('asset/img/home/mini_logo.png')} />
            <div>
              <p>{hero.title}</p>
              <p>{hero.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="product-body">
          <p>{hero.description}</p>
        </div>
      </div>
    )
  }
}

export default HeroCard
