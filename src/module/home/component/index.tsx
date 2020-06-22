import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { RootState } from 'type/state'
import { TabType } from '../type'
import { actions } from '../index'
import Explore from './Explore'
import Claims from './Claims'
import Plans from './Plans'
import './index.less'

interface Props extends DispatchProp {
    type: TabType | undefined;
}

class Main extends React.PureComponent<Props> {
    tabs = [{ title: '疾风剑豪', key: 'explore' }, { title: '影流之主', key: 'plans' }, { title: '诡术妖姬', key: 'claims' }];

    tabsMap = { explore: 0, plans: 1, claims: 2 };

    getActiveTab = () => this.tabsMap[this.props.type as TabType];

    // onChangeTab = (tabs: Models.TabData) => this.props.dispatch(actions.pushHomeTypeInHistory(tabs.key as TabType));

    render () {
      const { type } = this.props

      return (
        <div className="ro-tabs-home">
          ros
        </div>
      )
    }
}

const mapStateToProps = (state: RootState) => {
  return {
    type: state.app.home.type,
  }
}

export default connect(mapStateToProps)(Main)
