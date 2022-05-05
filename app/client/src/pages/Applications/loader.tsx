import React from "react";
import PageLoadingBar from "pages/common/PageLoadingBar";
import { retryPromise } from "utils/AppsmithUtils";
import PerformanceTracker, {
  PerformanceTransactionName,
} from "utils/PerformanceTracker";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { executeSaveTrigger } from "sagas/TokenSagas";
import { connect } from "react-redux";

class ApplicationListLoader extends React.PureComponent<any, { Page: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      Page: null,
    };
  }

  componentDidMount() {
    this.props.executeAction("");
    PerformanceTracker.stopTracking(PerformanceTransactionName.LOGIN_CLICK);
    AnalyticsUtil.logEvent("APPLICATIONS_PAGE_LOAD");
    retryPromise(() =>
      import(/* webpackChunkName: "applications" */ "./index"),
    ).then((module) => {
      this.setState({ Page: module.default });
    });
  }

  render() {
    const { Page } = this.state;

    return Page ? <Page {...this.props} /> : <PageLoadingBar />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  executeAction: () => dispatch(executeSaveTrigger("")),
});

export default connect(null, mapDispatchToProps)(ApplicationListLoader);
