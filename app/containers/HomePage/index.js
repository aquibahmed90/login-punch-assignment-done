/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectToken } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';

import Button from './Button';

import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { changePassword } from './actions';
import { makeSelectUsername } from './selectors';
import { makeSelectPassword } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

constructor(props) {
  super(props)
  this.submitLogin  = this.submitLogin.bind(this)
}

submitLogin(){


  if (this.props.password  && this.props.username ) {
        let params = {}
        params.username = this.props.username
        params.password = this.props.password     
        this.props.onSubmitForm(params)
  }
}

componentWillReceiveProps(nextProps) {

console.log(nextProps.error);

  if(nextProps.token)
    this.props.router.push('/features')



}


  render() {
    const { loading, error, token, repos } = this.props;
    const {submitLogin} = this
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
     
        <div>
          
          <Section>
            
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="Email"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                  onKeyPress={(e)=>{if(e.key==='Enter'){this.submitLogin()}}}
                />

              </label>

          <label htmlFor="password">
                <FormattedMessage {...messages.trymePassword} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                  onKeyPress={(e)=>{if(e.key==='Enter'){this.submitLogin()}}}
                />
                
              </label>

              <Button type="button"
                    value="Login"
                    className="button"

                    onClick={this.props.onSubmitForm}
                    /> 

            </Form>

          </Section>
        </div>
     
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  password: React.PropTypes.string,
  onChangePassword: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onChangeUsername: (evt1) => dispatch(changeUsername(evt1.target.value)),
    onSubmitForm: (params) => {


     dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  token: makeSelectToken(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
