import {
    Component,
    Fragment,
} from 'react';

import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import * as actions from '../../data/actions/auth';

import {
    Sidebar,
    Info,
    Files
} from "../../components";

interface IProps { logOut: any; }

class Dashboard extends Component<IProps> {
    render() {
        const { logOut } = this.props;
        return (
            <Fragment>
                <Grid container spacing={3} className="p-3">
                    <Grid item xs={12} lg={3}>
                        <Sidebar logOut={logOut} />
                    </Grid>

                    <Grid item xs={12} lg={9}>
                        <div className="bg-night-sky p-3 rounded text-white h-90">
                            <Info />

                            <div className="divider opacity-2 my-3" />

                            <Files />
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default connect(null, actions)(Dashboard);