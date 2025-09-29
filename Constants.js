//import PopupCellRenderer from "./PopupCellRenderer"
import { Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function PopupCellRenderer(props) {
    
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    
    const spanClicked = (event) => {
        
        console.log("cellValue : " + cellValue)
    }
    
    return(
    <div>
              <Button style={{diaplay:"none"}} onClick={spanClicked} >{cellValue}</Button>  </div>
    )
    
    
}

export const frameworkComponents_2 = {
        ContentRender: PopupCellRenderer,

      };

export const columnDefshisto_2G_ini = [
   {headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'bandfreq'  , field :  'bandfreq'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'secteur'  , field :  'secteur'  , filter :  'agTextColumnFilter' },
{headerName :  'trx'  , field :  'trx'  , filter :  'agTextColumnFilter' },
{headerName :  'statut'  , field :  'statut'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'statut_tx_rx_tsstate_tsoper'  , field :  'statut_tx_rx_tsstate_tsoper'  , filter :  'agTextColumnFilter' },
{headerName :  'frequencyband'  , field :  'frequencyband'  , filter :  'agTextColumnFilter' },
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'txrx_conf'  , field :  'txrx_conf'  , filter :  'agTextColumnFilter' },
{headerName :  'txrx_ref'  , field :  'txrx_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_txrx_conf_vs_ref'  , field :  'check_txrx_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'tsstate'  , field :  'tsstate'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tsstate'  , field :  'check_tsstate'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'tsoper'  , field :  'tsoper'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tsoper'  , field :  'check_tsoper'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'base_bande'  , field :  'base_bande'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_conf_vs_ref'  , field :  'rru_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'check_rru_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },


    ]




export const columnDefshisto_3G_ini = [
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'secteur'  , field :  'secteur'  , filter :  'agTextColumnFilter' },
{headerName :  'userlabel'  , field :  'userlabel'  , filter :  'agTextColumnFilter' },
{headerName :  'statut_cell'  , field :  'statut_cell'  , filter :  'agTextColumnFilter' },
{headerName :  'operatingband'  , field :  'operatingband'  , filter :  'agTextColumnFilter' },
{headerName :  'uarfcndl_conf_vs_ref'  , field :  'uarfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_uarfcndl_conf_vs_ref'  , field :  'check_uarfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'uarfcnul_conf_vs_ref'  , field :  'uarfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_uarfcnul_conf_vs_ref'  , field :  'check_uarfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'localcellid'  , field :  'localcellid'  , filter :  'agTextColumnFilter' },
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'bandwidthdl_conf_vs_ref'  , field :  'bandwidthdl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_bandwidthdl_conf_vs_ref'  , field :  'check_bandwidthdl_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'bandwidthul_conf_vs_ref'  , field :  'bandwidthul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_bandwidthul_conf_vs_ref'  , field :  'check_bandwidthul_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'txrx_conf'  , field :  'txrx_conf'  , filter :  'agTextColumnFilter' },
{headerName :  'txrx_ref'  , field :  'txrx_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_txrx_conf_vs_ref'  , field :  'check_txrx_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'cellrange_conf_vs_ref'  , field :  'cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cellrange_conf_vs_ref'  , field :  'check_cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'base_bande'  , field :  'base_bande'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_conf_vs_ref'  , field :  'rru_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'check_rru_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },


    ]




export const columnDefshisto_4G_ini = [
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'bande'  , filter :  'agTextColumnFilter' },
{headerName :  'mimo_conf'  , field :  'mimo_conf'  , filter :  'agTextColumnFilter' },
{headerName :  'mimo_ref'  , field :  'mimo_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_mimo_conf_vs_ref'  , field :  'check_mimo_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'dlchbandwidth_conf_vs_ref'  , field :  'dlchbandwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_dlchbandwidth_conf_vs_ref'  , field :  'check_dlchbandwidth_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'ulchbandwidth_conf_vs_ref'  , field :  'ulchbandwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ulchbandwidth_conf_vs_ref'  , field :  'check_ulchbandwidth_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'earfcndl_conf_vs_ref'  , field :  'earfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_earfcndl_conf_vs_ref'  , field :  'check_earfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'earfcnul_conf_vs_ref'  , field :  'earfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_earfcnul_conf_vs_ref'  , field :  'check_earfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'cellrange_conf_vs_ref'  , field :  'cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cellrange_conf_vs_ref'  , field :  'check_cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'pci_conf_vs_ref'  , field :  'pci_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_pci_conf_vs_ref'  , field :  'check_pci_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'nbrrrs'  , field :  'nbrrrs'  , filter :  'agTextColumnFilter' },
{headerName :  'rss_conf_vs_ref'  , field :  'rss_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rss_conf_vs_ref'  , field :  'check_rss_conf_vs_ref'  , filter :  'agTextColumnFilter' ,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'essscpairid'  , field :  'essscpairid'  , filter :  'agTextColumnFilter' },
{headerName :  'esssclocalid'  , field :  'esssclocalid'  , filter :  'agTextColumnFilter' },
{headerName :  'check_dss_2'  , field :  'check_dss_2'  , filter :  'agTextColumnFilter' },
{headerName :  'tac_conf_vs_ref'  , field :  'tac_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tac_conf_vs_ref'  , field :  'check_tac_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'enbid_conf_vs_ref'  , field :  'enbid_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_enbid_conf_vs_ref'  , field :  'check_enbid_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'base_bande'  , field :  'base_bande'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_conf_vs_ref'  , field :  'rru_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'check_rru_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },


    ]



export const columnDefshisto_eran_ini = [
    	{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'eutranfreqrelation_nok'  , field :  'eutranfreqrelation_nok'  , filter :  'agTextColumnFilter' },
{headerName :  'interco'  , field :  'interco'  , filter :  'agTextColumnFilter' },
{headerName :  'synchro_time_phase'  , field :  'synchro_time_phase'  , filter :  'agTextColumnFilter' },
{headerName :  'check_synchro_time_phase'  , field :  'check_synchro_time_phase'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'ipsec_5g_enabled_disabled'  , field :  'ipsec_5g_enabled_disabled'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ipsec_5g_enabled_disabled'  , field :  'check_ipsec_5g_enabled_disabled'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'ipsec_4g_enabled_disabled'  , field :  'ipsec_4g_enabled_disabled'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ipsec_4g_enabled_disabled'  , field :  'check_ipsec_4g_enabled_disabled'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'activation_compteur'  , field :  'activation_compteur'  , filter :  'agTextColumnFilter' },
{headerName :  'check_activation_compteur'  , field :  'check_activation_compteur'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'dss_check_3'  , field :  'dss_check_3'  , filter :  'agTextColumnFilter' },
{headerName :  'check_dss_check_3'  , field :  'check_dss_check_3'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'sfp'  , field :  'sfp'  , filter :  'agTextColumnFilter' },
{headerName :  'check_sfp'  , field :  'check_sfp'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'inner_lte_ip_conf_vs_ref'  , field :  'inner_lte_ip_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_inner_lte_ip_conf_vs_ref'  , field :  'check_inner_lte_ip_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'inner_5g_ip_conf_vs_ref'  , field :  'inner_5g_ip_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_inner_5g_ip_conf_vs_ref'  , field :  'check_inner_5g_ip_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'mapping_rfport'  , field :  'mapping_rfport'  , filter :  'agTextColumnFilter' },
{headerName :  'check_mapping_rfport'  , field :  'check_mapping_rfport'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
    {headerName :  'check_noeud_a_supprimer'  , field :  'check_noeud_a_supprimer'  , filter :  'agTextColumnFilter' },
    
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },

    ]






export const columnDefshisto_gen_4G_ini = [
   {headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'transmissionmode'  , field :  'transmissionmode'  , filter :  'agTextColumnFilter' },
{headerName :  'check_transmissionmode'  , field :  'check_transmissionmode'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'crsgain_conf_vs_ref'  , field :  'crsgain_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_crsgain_conf_vs_ref'  , field :  'check_crsgain_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'pdschtypebgain_conf_vs_ref'  , field :  'pdschtypebgain_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_pdschtypebgain_conf_vs_ref'  , field :  'check_pdschtypebgain_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'tac_conf_vs_ref'  , field :  'tac_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tac_conf_vs_ref'  , field :  'check_tac_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'nbrrrs'  , field :  'nbrrrs'  , filter :  'agTextColumnFilter' },
{headerName :  'pci_conf_vs_ref'  , field :  'pci_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_pci_conf_vs_ref'  , field :  'check_pci_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'rrs_conf_vs_ref'  , field :  'rrs_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rrs_conf_vs_ref'  , field :  'check_rrs_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'productname'  , field :  'productname'  , filter :  'agTextColumnFilter' },
{headerName :  'software'  , field :  'software'  , filter :  'agTextColumnFilter' },
{headerName :  'check_software'  , field :  'check_software'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'enbid_conf_vs_ref'  , field :  'enbid_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_enbid_conf_vs_ref'  , field :  'check_enbid_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'antenne_conf_vs_ref'  , field :  'antenne_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_antenne_conf_vs_ref'  , field :  'check_antenne_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },

    ]



export const columnDefshisto_licence_site_ini = [
   
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'licence'  , field :  'licence'  , filter :  'agTextColumnFilter' },
{headerName :  'check_licence'  , field :  'check_licence'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'administrativestate'  , field :  'administrativestate'  , filter :  'agTextColumnFilter' },
{headerName :  'check_administrativestate'  , field :  'check_administrativestate'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'syncnodepriority'  , field :  'syncnodepriority'  , filter :  'agTextColumnFilter' },
{headerName :  'syncriportstatus'  , field :  'syncriportstatus'  , filter :  'agTextColumnFilter' },
{headerName :  'check_synchronisation'  , field :  'check_synchronisation'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'list_alarm'  , field :  'list_alarm'  , filter :  'agTextColumnFilter' },
{headerName :  'check_alarm'  , field :  'check_alarm'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'missing_ret'  , field :  'missing_ret'  , filter :  'agTextColumnFilter' },
{headerName :  'check_missing_ret'  , field :  'check_missing_ret'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'ret_bb_vs_antenna_matching'  , field :  'ret_bb_vs_antenna_matching'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ret_bb_vs_antenna_matching'  , field :  'check_ret_bb_vs_antenna_matching'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'ret_connectors'  , field :  'ret_connectors'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ret_connectors'  , field :  'check_ret_connectors'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
    
{headerName :  'valeur_ret'  , field :  'valeur_ret'  , filter :  'agTextColumnFilter' },
{headerName :  'check_valeur_ret'  , field :  'check_valeur_ret'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } }, 
{headerName :  'userlabel'  , field :  'userlabel'  , filter :  'agTextColumnFilter' },
{headerName :  'check_userlabel'  , field :  'check_userlabel'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },


    ]



export const columnDefshisto_mimo_ini = [
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'qrxlevmin_conf_vs_ref'  , field :  'qrxlevmin_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_qrxlevmin_conf_vs_ref'  , field :  'check_qrxlevmin_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'check_performance'  , field :  'check_performance'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },


    ]












export const columnDefshisto_5G_ini = [
 {headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'noofusedtxantennas_conf_vs_ref'  , field :  'noofusedtxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_noofusedtxantennas_conf_vs_ref'  , field :  'check_noofusedtxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'noofusedrxantennas_conf_vs_ref'  , field :  'noofusedrxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_noofusedrxantennas_conf_vs_ref'  , field :  'check_noofusedrxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'bschannelbwdl_conf_vs_ref'  , field :  'bschannelbwdl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_bschannelbwdl_conf_vs_ref'  , field :  'check_bschannelbwdl_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'bschannelbwul_conf_vs_ref'  , field :  'bschannelbwul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_bschannelbwul_conf_vs_ref'  , field :  'check_bschannelbwul_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'arfcndl_conf_vs_ref'  , field :  'arfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_arfcndl_conf_vs_ref'  , field :  'check_arfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'arfcnul_conf_vs_ref'  , field :  'arfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_arfcnul_conf_vs_ref'  , field :  'check_arfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'cellrange_conf_vs_ref'  , field :  'cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cellrange_conf_vs_ref'  , field :  'check_cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'nrpci_conf_vs_ref'  , field :  'nrpci_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_nrpci_conf_vs_ref'  , field :  'check_nrpci_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'rss_conf_vs_ref'  , field :  'rss_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rss_conf_vs_ref'  , field :  'check_rss_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'essscpairid'  , field :  'essscpairid'  , filter :  'agTextColumnFilter' },
{headerName :  'esssclocalid'  , field :  'esssclocalid'  , filter :  'agTextColumnFilter' },
{headerName :  'check_dss_2'  , field :  'check_dss_2'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'tac_conf_vs_ref'  , field :  'tac_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tac_conf_vs_ref'  , field :  'check_tac_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'gnbid_conf_vs_ref'  , field :  'gnbid_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_gnbid_conf_vs_ref'  , field :  'check_gnbid_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'base_bande'  , field :  'base_bande'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_conf_vs_ref'  , field :  'rru_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'check_rru_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },


    ]


export const columnDefshisto_synthese = [
    {headerName :  "date_insertion", field : "date_insertion"  , filter :  'agTextColumnFilter' },
 {headerName :  "Programme", field : "programme" , filter :  'agTextColumnFilter' },
    {headerName : "sitename", field : "sitename", filter :  'agTextColumnFilter' },
   {headerName : "zone", field : "zone", filter :  'agTextColumnFilter'  }, 
    {headerName : "Parametre_NOK",  field : "parametre_nok", filter :  'agTextColumnFilter' },]




export const columnDefshisto_synthese_tdd = [
    {headerName :  "date_insertion", field : "date_insertion"  , filter :  'agTextColumnFilter' },
 {headerName :  "Programme", field : "programme" , filter :  'agTextColumnFilter' },
    {headerName : "sitename", field : "sitename", filter :  'agTextColumnFilter' },
   {headerName : "zone", field : "zone", filter :  'agTextColumnFilter'  }, 
    {headerName : "Parametre_NOK",  field : "parametre_nok", filter :  'agTextColumnFilter' },]



export const columnDefshisto_5G_tdd_ini = [{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'statut_cell'  , field :  'statut_cell'  , filter :  'agTextColumnFilter' },
{headerName :  'statut_sectorcarrier'  , field :  'statut_sectorcarrier'  , filter :  'agTextColumnFilter' },
{headerName :  'noofusedtxantennas_conf_vs_ref'  , field :  'noofusedtxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_noofusedtxantennas_conf_vs_ref'  , field :  'check_noofusedtxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'noofusedrxantennas_conf_vs_ref'  , field :  'noofusedrxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_noofusedrxantennas_conf_vs_ref'  , field :  'check_noofusedrxantennas_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'arfcndl_conf_vs_ref'  , field :  'arfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_arfcndl_conf_vs_ref'  , field :  'check_arfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'arfcnul_conf_vs_ref'  , field :  'arfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_arfcnul_conf_vs_ref'  , field :  'check_arfcnul_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'frequencydl'  , field :  'frequencydl'  , filter :  'agTextColumnFilter' },
{headerName :  'frequencyul'  , field :  'frequencyul'  , filter :  'agTextColumnFilter' },
{headerName :  'bschannelbwdl_conf_vs_ref'  , field :  'bschannelbwdl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_bschannelbwdl_conf_vs_ref'  , field :  'check_bschannelbwdl_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'bschannelbwul_conf_vs_ref'  , field :  'bschannelbwul_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_bschannelbwul_conf_vs_ref'  , field :  'check_bschannelbwul_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'cellrange_conf_vs_ref'  , field :  'cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cellrange_conf_vs_ref'  , field :  'check_cellrange_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'nrpci_conf_vs_ref'  , field :  'nrpci_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_nrpci_conf_vs_ref'  , field :  'check_nrpci_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'rss_conf_vs_ref'  , field :  'rss_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rachrootsequence_conf_vs_ref'  , field :  'check_rachrootsequence_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'check_nrtac_conf_vs_ref'  , field :  'check_nrtac_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'gnbid_conf_vs_ref'  , field :  'gnbid_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_gnbid_conf_vs_ref'  , field :  'check_gnbid_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'base_bande'  , field :  'base_bande'  , filter :  'agTextColumnFilter' },
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },

{headerName :  'RRU_conf_vs_ref'  , field :  'RRU_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_RRU_conf_vs_ref'  , field :  'Check_RRU_conf_vs_ref'  , filter :  'agTextColumnFilter' },
                                           
                                           
                                           

]



export const columnDefshisto_Site_tdd_ini = [
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'check_vlanport_eran_e5_5g'  , field :  'check_vlanport_eran_e5_5g'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'baseband'  , field :  'baseband'  , filter :  'agTextColumnFilter' },
{headerName :  'eutranfreqrelation'  , field :  'eutranfreqrelation'  , filter :  'agTextColumnFilter' },
{headerName :  'software'  , field :  'software'  , filter :  'agTextColumnFilter' },
{headerName :  'check_software'  , field :  'check_software'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'userlabel'  , field :  'userlabel'  , filter :  'agTextColumnFilter' },
{headerName :  'check_userlabel'  , field :  'check_userlabel'  , filter :  'agTextColumnFilter' },
{headerName :  'gnbid'  , field :  'gnbid'  , filter :  'agTextColumnFilter' },
{headerName :  'check_alarm'  , field :  'check_alarm'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'list_alarm'  , field :  'list_alarm'  , filter :  'agTextColumnFilter' },
{headerName :  'synchro_time_phase'  , field :  'synchro_time_phase'  , filter :  'agTextColumnFilter' },
{headerName :  'check_synchro_time_phase'  , field :  'check_synchro_time_phase'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'ipsec_5g_enabled_disabled'  , field :  'ipsec_5g_enabled_disabled'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ipsec_5g_enabled_disabled'  , field :  'check_ipsec_5g_enabled_disabled'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'sfp'  , field :  'sfp'  , filter :  'agTextColumnFilter' },
{headerName :  'check_sfp'  , field :  'check_sfp'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'activation_compteur'  , field :  'activation_compteur'  , filter :  'agTextColumnFilter' },
{headerName :  'check_activation_compteur'  , field :  'check_activation_compteur'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'sitetheorique'  , field :  'sitetheorique'  , filter :  'agTextColumnFilter' },
{headerName :  'synchro_8275'  , field :  'synchro_8275'  , filter :  'agTextColumnFilter' },
{headerName :  'Chech_Syncho'  , field :  'Chech_Syncho'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
    
{headerName :  'date_ref'  , field :  'date_ref'  , filter :  'agTextColumnFilter' },
    
    

]



export const columnDefshisto_licence_huw_ini = [
    
    {headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
    {headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'Port_Type'  , field :  'port_type'  , filter :  'agTextColumnFilter' },
{headerName :  'Port_Status'  , field :  'port_status'  , filter :  'agTextColumnFilter' },
{headerName :  'BaseBand'  , field :  'baseband'  , filter :  'agTextColumnFilter' },
{headerName :  'Type_Licence'  , field :  'type_licence'  , filter :  'agTextColumnFilter' },
{headerName :  'Date_Expiration'  , field :  'date_expiration'  , filter :  'agTextColumnFilter' },
{headerName :  'VSWR'  , field :  'VSWR'  , filter :  'agTextColumnFilter' },
{headerName :  'modele_antenne_conf'  , field :  'modele_antenne_conf'  , filter :  'agTextColumnFilter' },
{headerName :  'modele_antenne_ref'  , field :  'modele_antenne_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_antenne_modele_conf_vs_ref'  , field :  'check_antenne_modele_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },

]


export const columnDefshisto_gen_4G_huw_ini = [
    
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'cell_id'  , field :  'cell_id'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'operateur'  , field :  'operateur'  , filter :  'agTextColumnFilter' },
{headerName :  'earfcndl_conf_vs_ref'  , field :  'earfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_earfcndl_conf_vs_ref'  , field :  'check_earfcndl_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'ul_bwidth_conf_vs_ref'  , field :  'ul_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ul_bwidth_conf_vs_ref'  , field :  'check_ul_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'dl_bwidth_conf_vs_ref'  , field :  'dl_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_dl_bwidth_conf_vs_ref'  , field :  'check_dl_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'cust_bwidth'  , field :  'cust_bwidth'  , filter :  'agTextColumnFilter' },
{headerName :  'ul_cust_bwidth'  , field :  'ul_cust_bwidth'  , filter :  'agTextColumnFilter' },
{headerName :  'dl_cust_bwidth'  , field :  'dl_cust_bwidth'  , filter :  'agTextColumnFilter' },
{headerName :  'pci_conf_vs_ref'  , field :  'pci_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_pci_conf_vs_ref'  , field :  'check_pci_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'rss_conf_vs_ref'  , field :  'rss_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rss_conf_vs_ref'  , field :  'check_rss_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'cell_radius'  , field :  'cell_radius'  , filter :  'agTextColumnFilter' },
{headerName :  'tac_conf_vs_ref'  , field :  'tac_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tac_conf_vs_ref'  , field :  'check_tac_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'rsp'  , field :  'rsp'  , filter :  'agTextColumnFilter' },
{headerName :  'pa'  , field :  'pa'  , filter :  'agTextColumnFilter' },
{headerName :  'pb'  , field :  'pb'  , filter :  'agTextColumnFilter' },
{headerName :  'cpri_compression'  , field :  'cpri_compression'  , filter :  'agTextColumnFilter' },
{headerName :  'sector_eqpt'  , field :  'sector_eqpt'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_type'  , field :  'rru_type'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_rru'  , field :  'conf_mimo_rru'  , filter :  'agTextColumnFilter' },
{headerName :  'position_physique'  , field :  'position_physique'  , filter :  'agTextColumnFilter' },
{headerName :  'position_logique'  , field :  'position_logique'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_rru'  , field :  'sfp_rru'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_bbp'  , field :  'sfp_bbp'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_cellule'  , field :  'conf_mimo_cellule'  , filter :  'agTextColumnFilter' },
{headerName :  'mimo_ref'  , field :  'mimo_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_conf_mimo_vs_ref'  , field :  'check_conf_mimo_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'nbre_utilisateurs'  , field :  'nbre_utilisateurs'  , filter :  'agTextColumnFilter' },
{headerName :  'dss'  , field :  'dss'  , filter :  'agTextColumnFilter' },
{headerName :  'bande_name'  , field :  'bande_name'  , filter :  'agTextColumnFilter' },
{headerName :  'cross_feeder'  , field :  'cross_feeder'  , filter :  'agTextColumnFilter' },
{headerName :  'band_dst'  , field :  'band_dst'  , filter :  'agTextColumnFilter' },
{headerName :  'scc_prio'  , field :  'scc_prio'  , filter :  'agTextColumnFilter' },
    {headerName :  'rru_conf_vs_ref'  , field :  'rru_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'check_rru_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }} ,
{headerName :  'pcc_freq'  , field :  'pcc_freq'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } }
	

]


export const columnDefshisto_alarm_huw_ini = [
    {headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
    {headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'criticité'  , field :  'criticité'  , filter :  'agTextColumnFilter' },
{headerName :  'Alarm_ID'  , field :  'alarm_id'  , filter :  'agTextColumnFilter' },
{headerName :  'Name'  , field :  'name'  , filter :  'agTextColumnFilter' },
{headerName :  'Location_information'  , field :  'location_information'  , filter :  'agTextColumnFilter' },

]



export const columnDefshisto_gen_5G_huw_ini = [
    
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'programme'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'cell_id'  , field :  'cell_id'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'check_cell_techno'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'operateur'  , field :  'operateur'  , filter :  'agTextColumnFilter' },
{headerName :  'dl_narfcn_conf_vs_ref'  , field :  'dl_narfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_dl_narfcn_conf_vs_ref'  , field :  'Check_dl_narfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'ul_narfcn_conf_vs_ref'  , field :  'ul_narfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_ul_narfcn_conf_vs_ref'  , field :  'Check_ul_narfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'ul_bwidth_conf_vs_ref'  , field :  'ul_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_ul_bwidth_conf_vs_ref'  , field :  'check_ul_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },
{headerName :  'dl_bwidth_conf_vs_ref'  , field :  'dl_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_dl_bwidth_conf_vs_ref'  , field :  'check_dl_bwidth_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'pci_conf_vs_ref'  , field :  'pci_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_pci_conf_vs_ref'  , field :  'check_pci_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'rss_conf_vs_ref'  , field :  'rss_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rss_conf_vs_ref'  , field :  'check_rss_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'configuredmaxtxpower_conf_vs_ref'  , field :  'configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_configuredmaxtxpower_conf_vs_ref'  , field :  'check_configuredmaxtxpower_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
{headerName :  'tac_conf_vs_ref'  , field :  'tac_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_tac_conf_vs_ref'  , field :  'check_tac_conf_vs_ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }   },

{headerName :  'cpri_compression'  , field :  'cpri_compression'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_name'  , field :  'rru_name'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_type'  , field :  'rru_type'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_rru'  , field :  'conf_mimo_rru'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_rru'  , field :  'sfp_rru'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_bbp'  , field :  'sfp_bbp'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_cellule'  , field :  'conf_mimo_cellule'  , filter :  'agTextColumnFilter' },
{headerName :  'mimo_ref'  , field :  'mimo_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_conf_mimo_vs_ref'  , field :  'check_conf_mimo_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'nbre_utilisateurs'  , field :  'nbre_utilisateurs'  , filter :  'agTextColumnFilter' },
{headerName :  'dss'  , field :  'dss'  , filter :  'agTextColumnFilter' },
{headerName :  'bande_name'  , field :  'bande_name'  , filter :  'agTextColumnFilter' },
{headerName :  'cross_feeder'  , field :  'cross_feeder'  , filter :  'agTextColumnFilter' },
{headerName :  'band_dst'  , field :  'band_dst'  , filter :  'agTextColumnFilter' },
{headerName :  'scc_prio'  , field :  'scc_prio'  , filter :  'agTextColumnFilter' },
{headerName :  'ssb_freq'  , field :  'ssb_freq'  , filter :  'agTextColumnFilter' },
{headerName :  'power_par_tx'  , field :  'power_par_tx'  , filter :  'agTextColumnFilter' },
{headerName :  'subcarrier_spacings'  , field :  'subcarrier_spacings'  , filter :  'agTextColumnFilter' },
    
    {headerName :  'rru_conf_vs_ref'  , field :  'rru_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'check_rru_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } }

]




export const columnDefshisto_gen_3G_huw_ini = [
    
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'Programme'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'cell_id'  , field :  'cell_id'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'Bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'Check_Cell_Techno'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'operateur'  , field :  'Operateur'  , filter :  'agTextColumnFilter' },
{headerName :  'dl_uarfcn_conf_vs_ref'  , field :  'dl_uarfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_dl_uarfcn_conf_vs_ref'  , field :  'Check_dl_uarfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
{headerName :  'ul_uarfcn_conf_vs_ref'  , field :  'ul_uarfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_ul_uarfcn_conf_vs_ref'  , field :  'Check_ul_uarfcn_conf_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },

{headerName :  'SC'  , field :  'SC'  , filter :  'agTextColumnFilter' },
{headerName :  'LAC'  , field :  'LAC'  , filter :  'agTextColumnFilter' },
{headerName :  'configuredMaxTxPower_Conf_vs_Ref'  , field :  'configuredMaxTxPower_Conf_vs_Ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_configuredMaxTxPower_Conf_vs_Ref'  , field :  'Check_configuredMaxTxPower_Conf_vs_Ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
    
{headerName :  'Cell_state'  , field :  'Cell_state'  , filter :  'agTextColumnFilter' },
{headerName :  'Sector_Eqpt'  , field :  'Sector_Eqpt'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_name'  , field :  'RRU_Name'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_type'  , field :  'RRU_Type'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_rru'  , field :  'Conf_MIMO_RRU'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_rru'  , field :  'SFP_RRU'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_bbp'  , field :  'SFP_BBP'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_cellule'  , field :  'Conf_MIMO_Cellule'  , filter :  'agTextColumnFilter' },
{headerName :  'mimo_ref'  , field :  'Mimo_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_conf_mimo_vs_ref'  , field :  'Check_Conf_MIMO_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
    
{headerName :  'rru_conf_vs_ref'  , field :  'RRU_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'Check_RRU_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } }

]


export const columnDefshisto_gen_2G_huw_ini = [
    
{headerName :  'date_insertion'  , field :  'date_insertion'  , filter :  'agTextColumnFilter' },
{headerName :  'programme'  , field :  'Programme'  , filter :  'agTextColumnFilter' },
{headerName :  'zone'  , field :  'zone'  , filter :  'agTextColumnFilter' },
{headerName :  'cell_id'  , field :  'cell_id'  , filter :  'agTextColumnFilter' },
{headerName :  'sitename'  , field :  'sitename'  , filter :  'agTextColumnFilter' },
{headerName :  'cellname'  , field :  'cellname'  , filter :  'agTextColumnFilter' },
{headerName :  'bande'  , field :  'Bande'  , filter :  'agTextColumnFilter' },
{headerName :  'check_cell_techno'  , field :  'Check_Cell_Techno'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }},
{headerName :  'operateur'  , field :  'Operateur'  , filter :  'agTextColumnFilter' },


{headerName :  'BCCH'  , field :  'BCCH'  , filter :  'agTextColumnFilter' },
{headerName :  'LAC'  , field :  'LAC'  , filter :  'agTextColumnFilter' },
{headerName :  'NCC'  , field :  'NCC'  , filter :  'agTextColumnFilter' },
{headerName :  'BCC'  , field :  'BCC'  , filter :  'agTextColumnFilter' },
{headerName :  'configuredMaxTxPower_Conf_vs_Ref'  , field :  'configuredMaxTxPower_Conf_vs_Ref'  , filter :  'agTextColumnFilter' },
{headerName :  'Check_configuredMaxTxPower_Conf_vs_Ref'  , field :  'Check_configuredMaxTxPower_Conf_vs_Ref'  , filter :  'agTextColumnFilter', cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } },
    
{headerName :  'Cell_state'  , field :  'Cell_state'  , filter :  'agTextColumnFilter' },
{headerName :  'Sector_Eqpt'  , field :  'Sector_Eqpt'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_name'  , field :  'RRU_Name'  , filter :  'agTextColumnFilter' },
{headerName :  'rru_type'  , field :  'RRU_Type'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_rru'  , field :  'Conf_MIMO_RRU'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_rru'  , field :  'SFP_RRU'  , filter :  'agTextColumnFilter' },
{headerName :  'sfp_bbp'  , field :  'SFP_BBP'  , filter :  'agTextColumnFilter' },
{headerName :  'conf_mimo_cellule'  , field :  'Conf_MIMO_Cellule'  , filter :  'agTextColumnFilter' },
{headerName :  'mimo_ref'  , field :  'Mimo_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_conf_mimo_vs_ref'  , field :  'Check_Conf_MIMO_vs_ref'  , filter :  'agTextColumnFilter' , cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }  },
    
{headerName :  'rru_conf_vs_ref'  , field :  'RRU_conf_vs_ref'  , filter :  'agTextColumnFilter' },
{headerName :  'check_rru_conf_vs_ref'  , field :  'Check_RRU_conf_vs_ref'  , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            } }

]



export const columnDefshisto_configuration_software = [
{headerName :  'nom_parametre'  , field :  'nom_parametre'  , filter :  'agTextColumnFilter' },
{headerName :  'sous_parametre'  , field :  'sous_parametre'  , filter :  'agTextColumnFilter' },
{headerName :  'nom_parametre_evalue'  , field :  'nom_parametre_evalue'  , filter :  'agTextColumnFilter' },
{headerName :  'valeur_parametre'  , field :  'valeur_parametre'  , filter :  'agTextColumnFilter' }
]



export const TwoG_default = {
    date_insertion  :  true,
    programme  :  true,
sitename  :  true,
cellname  :  true,
bandfreq  :  true,
zone  :  true,
secteur  :  true,
trx  :  true,
statut  :  true,
check_cell_techno  :  true,
statut_tx_rx_tsstate_tsoper  :  true,
frequencyband  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
txrx_conf  :  true,
txrx_ref  :  true,
check_txrx_conf_vs_ref  :  true,
tsstate  :  true,
check_tsstate  :  true,
tsoper  :  true,
check_tsoper  :  true,
noofrxantennas  :  true,
nooftxantennas  :  true,
abisatstate  :  true,
bscnodeidentity  :  true,
base_bande  :  true,
rru_conf_vs_ref  :  true,
check_rru_conf_vs_ref  :  true,
date_ref  :  true,


  }


export const ThreeG_ERC_default = {
    date_insertion  :  true,
programme  :  true,
sitename  :  true,
cellname  :  true,
zone  :  true,
secteur  :  true,
userlabel  :  true,
statut_cell  :  true,
operatingband  :  true,
uarfcndl_conf_vs_ref  :  true,
check_uarfcndl_conf_vs_ref  :  true,
uarfcnul_conf_vs_ref  :  true,
check_uarfcnul_conf_vs_ref  :  true,
localcellid  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
bandwidthdl_conf_vs_ref  :  true,
check_bandwidthdl_conf_vs_ref  :  true,
bandwidthul_conf_vs_ref  :  true,
check_bandwidthul_conf_vs_ref  :  true,
txrx_conf  :  true,
txrx_ref  :  true,
check_txrx_conf_vs_ref  :  true,
cellrange_conf_vs_ref  :  true,
check_cellrange_conf_vs_ref  :  true,
base_bande  :  true,
rru_conf_vs_ref  :  true,
check_rru_conf_vs_ref  :  true,
date_ref  :  true,

    }
    
export const FourG_ERC_default ={
date_insertion  :  true,
programme  :  true,
sitename  :  true,
cellname  :  true,
zone  :  true,
bande  :  true,
mimo_conf  :  true,
mimo_ref  :  true,
check_mimo_conf_vs_ref  :  true,
check_cell_techno  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
dlchbandwidth_conf_vs_ref  :  true,
check_dlchbandwidth_conf_vs_ref  :  true,
ulchbandwidth_conf_vs_ref  :  true,
check_ulchbandwidth_conf_vs_ref  :  true,
earfcndl_conf_vs_ref  :  true,
check_earfcndl_conf_vs_ref  :  true,
earfcnul_conf_vs_ref  :  true,
check_earfcnul_conf_vs_ref  :  true,
cellrange_conf_vs_ref  :  true,
check_cellrange_conf_vs_ref  :  true,
pci_conf_vs_ref  :  true,
check_pci_conf_vs_ref  :  true,
nbrrrs  :  true,
rss_conf_vs_ref  :  true,
check_rss_conf_vs_ref  :  true,
}


export const FourGen_ERC_default ={
date_insertion  :  true,
programme  :  true,
sitename  :  true,
cellname  :  true,
zone  :  true,
bande  :  true,
check_cell_techno  :  true,
transmissionmode  :  true,
check_transmissionmode  :  true,
crsgain_conf_vs_ref  :  true,
check_crsgain_conf_vs_ref  :  true,
pdschtypebgain_conf_vs_ref  :  true,
check_pdschtypebgain_conf_vs_ref  :  true,
tac_conf_vs_ref  :  true,
check_tac_conf_vs_ref  :  true,
nbrrrs  :  true,
pci_conf_vs_ref  :  true,
check_pci_conf_vs_ref  :  true,
rrs_conf_vs_ref  :  true,
check_rrs_conf_vs_ref  :  true,
productname  :  true,
software  :  true,
check_software  :  true,
enbid_conf_vs_ref  :  true,
check_enbid_conf_vs_ref  :  true,
antenne_conf_vs_ref  :  true,
check_antenne_conf_vs_ref  :  true,
date_ref  :  true,

    }


export const FiveG_ERC_default ={
    date_insertion  :  true,
programme  :  true,
sitename  :  true,
cellname  :  true,
zone  :  true,
bande  :  true,
check_cell_techno  :  true,
noofusedtxantennas_conf_vs_ref  :  true,
check_noofusedtxantennas_conf_vs_ref  :  true,
noofusedrxantennas_conf_vs_ref  :  true,
check_noofusedrxantennas_conf_vs_ref  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
bschannelbwdl_conf_vs_ref  :  true,
check_bschannelbwdl_conf_vs_ref  :  true,
bschannelbwul_conf_vs_ref  :  true,
check_bschannelbwul_conf_vs_ref  :  true,
arfcndl_conf_vs_ref  :  true,
check_arfcndl_conf_vs_ref  :  true,
arfcnul_conf_vs_ref  :  true,
check_arfcnul_conf_vs_ref  :  true,
cellrange_conf_vs_ref  :  true,
check_cellrange_conf_vs_ref  :  true,
nrpci_conf_vs_ref  :  true,
check_nrpci_conf_vs_ref  :  true,
rss_conf_vs_ref  :  true,
}

export const Licence_ERC_default ={
    
    date_insertion  :  true,
programme  :  true,
sitename  :  true,
zone  :  true,
licence  :  true,
check_licence  :  true,
administrativestate  :  true,
check_administrativestate  :  true,
syncnodepriority  :  true,
syncriportstatus  :  true,
check_synchronisation  :  true,
list_alarm  :  true,
check_alarm  :  true,
missing_ret  :  true,
check_missing_ret  :  true,
ret_bb_vs_antenna_matching  :  true,
check_ret_bb_vs_antenna_matching  :  true,
ret_connectors  :  true,
check_ret_connectors  :  true,
valeur_ret  :  true,
check_valeur_ret  :  true,
userlabel  :  true,
check_userlabel  :  true,
date_ref  :  true,

    }


export const ERAN_ERC_default ={
date_insertion  :  true,
programme  :  true,
sitename  :  true,
zone  :  true,
eutranfreqrelation_nok  :  true,
interco  :  true,
synchro_time_phase  :  true,
check_synchro_time_phase  :  true,
ipsec_5g_enabled_disabled  :  true,
check_ipsec_5g_enabled_disabled  :  true,
ipsec_4g_enabled_disabled  :  true,
check_ipsec_4g_enabled_disabled  :  true,
activation_compteur  :  true,
check_activation_compteur  :  true,
dss_check_3  :  true,
check_dss_check_3  :  true,
sfp  :  true,
check_sfp  :  true,
inner_lte_ip_conf_vs_ref  :  true,
check_inner_lte_ip_conf_vs_ref  :  true,
inner_5g_ip_conf_vs_ref  :  true,
check_inner_5g_ip_conf_vs_ref  :  true,
mapping_rfport  :  true,
check_mapping_rfport  :  true,
nename  :  true,
check_noeud_a_supprimer  :  true,
date_ref  :  true,

    }



export const Mimo_ERC_default ={
    date_insertion  :  true,
programme  :  true,
sitename  :  true,
cellname  :  true,
zone  :  true,
mimo_conf  :  true,
mimo_ref  :  true,
check_mimo_conf_vs_ref  :  true,
qrxlevmin_conf_vs_ref  :  true,
check_qrxlevmin_conf_vs_ref  :  true,
check_performance  :  true,
date_ref  :  true,

    }



export const ThreeG_HUW_default = {
    date_insertion  :  true,
Programme  :  true,
zone  :  true,
cell_id  :  true,
sitename  :  true,
cellname  :  true,
Bande  :  true,
Check_Cell_Techno  :  true,
Operateur  :  true,
dl_uarfcn_conf_vs_ref  :  true,
Check_dl_uarfcn_conf_vs_ref  :  true,
ul_uarfcn_conf_vs_ref  :  true,
Check_ul_uarfcn_conf_vs_ref  :  true,
SC  :  true,
LAC  :  true,
configuredMaxTxPower_Conf_vs_Ref  :  true,
Check_configuredMaxTxPower_Conf_vs_Ref  :  true,
Cell_state  :  true,
Sector_Eqpt  :  true,
RRU_Name  :  true,
RRU_Type  :  true,
Conf_MIMO_RRU  :  true,
Position_Physique  :  true,
Position_Logique  :  true,
SFP_RRU  :  true,
SFP_BBP  :  true,
Conf_MIMO_Cellule  :  true,
Mimo_ref  :  true,
Check_Conf_MIMO_vs_ref  :  true,
RRU_conf_vs_ref  :  true,
Check_RRU_conf_vs_ref  :  true,

    }


    
export const TwoG_HUW_default = {
date_insertion  :  true,
Programme  :  true,
zone  :  true,
cell_id  :  true,
sitename  :  true,
cellname  :  true,
Bande  :  true,
Check_Cell_Techno  :  true,
Operateur  :  true,
BCCH  :  true,
Cell_CI  :  true,
LAC  :  true,
NCC  :  true,
BCC  :  true,
configuredMaxTxPower_Conf_vs_Ref  :  true,
Check_configuredMaxTxPower_Conf_vs_Ref  :  true,
Cell_state  :  true,
Sector_Eqpt  :  true,
RRU_Name  :  true,
RRU_Type  :  true,
Conf_MIMO_RRU  :  true,
Position_Physique  :  true,
Position_Logique  :  true,
SFP_RRU  :  true,
SFP_BBP  :  true,
Conf_MIMO_Cellule  :  true,
Mimo_ref  :  true,
Check_Conf_MIMO_vs_ref  :  true,
RRU_conf_vs_ref  :  true,
Check_RRU_conf_vs_ref  :  true,

}

 


export const FourG_HUW_default ={
date_insertion  :  true,
programme  :  true,
zone  :  true,
cell_id  :  true,
sitename  :  true,
cellname  :  true,
bande  :  true,
check_cell_techno  :  true,
operateur  :  true,
earfcndl_conf_vs_ref  :  true,
check_earfcndl_conf_vs_ref  :  true,
ul_bwidth_conf_vs_ref  :  true,
check_ul_bwidth_conf_vs_ref  :  true,
dl_bwidth_conf_vs_ref  :  true,
check_dl_bwidth_conf_vs_ref  :  true,
cust_bwidth  :  true,
ul_cust_bwidth  :  true,
dl_cust_bwidth  :  true,
pci_conf_vs_ref  :  true,
check_pci_conf_vs_ref  :  true,
rss_conf_vs_ref  :  true,
check_rss_conf_vs_ref  :  true,
cell_radius  :  true,
tac_conf_vs_ref  :  true,
check_tac_conf_vs_ref  :  true,
rsp  :  true,
pa  :  true,
pb  :  true,
cpri_compression  :  true,
sector_eqpt  :  true,
rru_name  :  true,
rru_type  :  true,
conf_mimo_rru  :  true,
position_physique  :  true,
position_logique  :  true,
sfp_rru  :  true,
sfp_bbp  :  true,
conf_mimo_cellule  :  true,
mimo_ref  :  true,
check_conf_mimo_vs_ref  :  true,
nbre_utilisateurs  :  true,
dss  :  true,
bande_name  :  true,
cross_feeder  :  true,
band_dst  :  true,
scc_prio  :  true,
rru_conf_vs_ref  :  true,
check_rru_conf_vs_ref  :  true,
pcc_freq  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
}



export const FiveG_HUW_default ={
date_insertion  :  true,
programme  :  true,
zone  :  true,
cell_id  :  true,
sitename  :  true,
cellname  :  true,
bande  :  true,
check_cell_techno  :  true,
operateur  :  true,
dl_narfcn_conf_vs_ref  :  true,
Check_dl_narfcn_conf_vs_ref  :  true,
ul_narfcn_conf_vs_ref  :  true,
Check_ul_narfcn_conf_vs_ref  :  true,
ul_bwidth_conf_vs_ref  :  true,
check_ul_bwidth_conf_vs_ref  :  true,
dl_bwidth_conf_vs_ref  :  true,
check_dl_bwidth_conf_vs_ref  :  true,
pci_conf_vs_ref  :  true,
check_pci_conf_vs_ref  :  true,
rss_conf_vs_ref  :  true,
check_rss_conf_vs_ref  :  true,
tac_conf_vs_ref  :  true,
check_tac_conf_vs_ref  :  true,
subcarrier_spacings  :  true,
ssb_freq  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
rsp  :  true,
pa  :  true,
pb  :  true,
cpri_compression  :  true,
sector_eqpt  :  true,
rru_name  :  true,
rru_type  :  true,
conf_mimo_rru  :  true,
position_physique  :  true,
position_logique  :  true,
sfp_rru  :  true,
sfp_bbp  :  true,
conf_mimo_cellule  :  true,
mimo_ref  :  true,
check_conf_mimo_vs_ref  :  true,
nbre_utilisateurs  :  true,
dss  :  true,
bande_name  :  true,
cross_feeder  :  true,
band_dst  :  true,
scc_prio  :  true,
rru_conf_vs_ref  :  true,
check_rru_conf_vs_ref  :  true,

    }



export const Licence_HUW_default ={
    date_insertion  :  true,
programme  :  true,
zone  :  true,
sitename  :  true,
port_type  :  true,
port_status  :  true,
baseband  :  true,
type_licence  :  true,
date_expiration  :  true,
VSWR  :  true,
modele_antenne_conf  :  true,
modele_antenne_ref  :  true,
check_antenne_modele_conf_vs_ref  :  true,

    }




export const Alarm_HUW_default ={
date_insertion  :  true,
programme  :  true,
zone  :  true,
sitename  :  true,
criticité  :  true,
alarm_id  :  true,
name  :  true,
location_information  :  true,

    }



export const FiveG_TDD_default ={
date_insertion  :  true,
programme  :  true,
sitename  :  true,
cellname  :  true,
zone  :  true,
bande  :  true,
check_cell_techno  :  true,
statut_cell  :  true,
statut_sectorcarrier  :  true,
noofusedtxantennas_conf_vs_ref  :  true,
check_noofusedtxantennas_conf_vs_ref  :  true,
noofusedrxantennas_conf_vs_ref  :  true,
check_noofusedrxantennas_conf_vs_ref  :  true,
arfcndl_conf_vs_ref  :  true,
check_arfcndl_conf_vs_ref  :  true,
arfcnul_conf_vs_ref  :  true,
check_arfcnul_conf_vs_ref  :  true,
frequencydl  :  true,
frequencyul  :  true,
bschannelbwdl_conf_vs_ref  :  true,
check_bschannelbwdl_conf_vs_ref  :  true,
bschannelbwul_conf_vs_ref  :  true,
check_bschannelbwul_conf_vs_ref  :  true,
configuredmaxtxpower_conf_vs_ref  :  true,
check_configuredmaxtxpower_conf_vs_ref  :  true,
cellrange_conf_vs_ref  :  true,
RRU_conf_vs_ref : true,
Check_RRU_conf_vs_ref : true,
}

export const Site_TDD_default ={
date_insertion  :  true,
programme  :  true,
sitename  :  true,
zone  :  true,
check_vlanport_eran_e5_5g  :  true,
baseband  :  true,
eutranfreqrelation  :  true,
software  :  true,
check_software  :  true,
userlabel  :  true,
check_userlabel  :  true,
gnbid  :  true,
check_alarm  :  true,
list_alarm  :  true,
synchro_time_phase  :  true,
check_synchro_time_phase  :  true,
ipsec_5g_enabled_disabled  :  true,
check_ipsec_5g_enabled_disabled  :  true,
sfp  :  true,
check_sfp  :  true,
activation_compteur  :  true,
check_activation_compteur  :  true,
sitetheorique  :  true,
synchro_8275  :  true,
Chech_Syncho  :  true,
date_ref  :  true,
}
    