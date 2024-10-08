import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './app.scss';
import {
  EuiPage,
  EuiPageBody,
  EuiTitle,
  EuiHorizontalRule,
  EuiTabs,
  EuiTab,
  EuiIcon,
} from '@elastic/eui';
import Overview from '../pages/Overview/Overview';
import Table from '../pages/Table/Table';
import OverviewGraphql from '../pages/OverviewGraphql/OverviewGraphql';
import TableGraphql from '../pages/TableGrapghql/TableGraphql';
import Import from '../pages/Import/Import';

interface TodoappAppDeps {
  basename?: string;
}

const todoTabs = [
  {
    id: 'overview',
    name: 'Overview',
    iconType: 'apps',
    component: Overview,
  },
  {
    id: 'table',
    name: 'Table',
    iconType: 'heatmap',
    component: Table,
  },
  {
    id: 'overviewgraphql',
    name: 'Overview Graphql',
    iconType: 'apps',
    component: OverviewGraphql,
  },
  {
    id: 'tablegraphql',
    name: 'Table Graphql',
    iconType: 'heatmap',
    component: TableGraphql,
  },
  {
    id: 'Import',
    name: 'Import',
    iconType: 'heatmap',
    component: Import,
  },
];

const TodoAppContent = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const onSelectedTabChanged = (id: string) => {
    push(`/${id}`);
  };

  const renderTabs = () => {
    return todoTabs.map((tab) => (
      <EuiTab
        key={tab.id}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={pathname === `/${tab.id}`}
      >
        <EuiIcon type={tab.iconType} />
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <EuiPage restrictWidth="1000px">
      <EuiPageBody component="main">
        <div className="mainpage">
          <EuiTitle size="s">
            <h2 className="mainpage-title">Todo App</h2>
          </EuiTitle>
          <EuiHorizontalRule className="mainpage-rule" />
          <EuiTabs className="mainpage-tabs">{renderTabs()}</EuiTabs>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/overview" />} />
            {todoTabs.map((tab) => (
              <Route key={tab.id} path={`/${tab.id}`} component={tab.component} />
            ))}
          </Switch>
        </div>
      </EuiPageBody>
    </EuiPage>
  );
};

export const TodoappApp = ({ basename }: TodoappAppDeps) => {
  return (
    <Router basename={basename}>
      <TodoAppContent />
    </Router>
  );
};
