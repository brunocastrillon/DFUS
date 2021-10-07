import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import * as actions from '../../data/actions/auth';

import {
    Sidebar,
    Info,
    Files
} from "../../components";

import { getContractDeployed } from '../../middlewares/blockchain/service';

declare const window: any;

interface IProps { logOut: any; }
interface IState { listFiles: []; }

class Dashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            listFiles: []
        };
    }

    async componentDidMount() {
        await this.handleListBlockChain();
    }

    handleListBlockChain = async () => {
        const ethereum = window.ethereum;
        const enderecoEnthereum = ethereum._state.accounts > 0 ? ethereum._state.accounts[0] : "";
        const fileManage = await getContractDeployed();

        let totalFiles = await fileManage.methods.total().call({ from: enderecoEnthereum });
        let list = [];

        for (let index = 0; index < totalFiles; index++) {
            let file = await fileManage.methods.read(index).call({ from: enderecoEnthereum });
            if (file.fileContent !== "") list.push(file);
        }

        const listFiles: any = list;
        this.setState({ ...this.state, listFiles });
        return listFiles;
    }    

    render() {
        const { logOut } = this.props;
        const { listFiles } = this.state;
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

                            <Files listFiles={listFiles} handleList={this.handleListBlockChain} />
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default connect(null, actions)(Dashboard);