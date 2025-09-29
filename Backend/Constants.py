import os

query_4G_5G = """SELECT Programme, date_insertion, SiteName , cellname, Bande, Check_Cell_Techno, '4G' as Techno , configuredmaxtxpower, DLchbandwidth_conf_vs_ref, Check_DLchbandwidth_conf_vs_ref, ULchbandwidth_conf_vs_ref, Check_ULchbandwidth_conf_vs_ref, earfcndl_conf_vs_ref ,  Check_earfcndl_conf_vs_ref, earfcnul_conf_vs_ref, Check_earfcnul_conf_vs_ref, CellRange_conf_vs_ref, Check_CellRange_conf_vs_ref, PCI_conf_vs_ref, Check_PCI_conf_vs_ref,  RSS_conf_vs_ref, Check_RSS_conf_vs_ref, essScPairId,  essScLocalId, Check_DSS_2, tac_conf_vs_ref, Check_tac_conf_vs_ref, Date_Ref
from Comp_Conf_avatar_4G"""
query_5G_4G = """SELECT Programme, date_insertion, SiteName , cellname, Bande, Check_Cell_Techno, '5G' as Techno, configuredmaxtxpower, bSChannelBwDL_conf_vs_ref, Check_bSChannelBwDL_conf_vs_ref, bSChannelBwUL_conf_vs_ref, Check_bSChannelBwUL_conf_vs_ref, arfcndl_conf_vs_ref , Check_arfcndl_conf_vs_ref, arfcnul_conf_vs_ref, Check_arfcnul_conf_vs_ref, CellRange_conf_vs_ref, Check_CellRange_conf_vs_ref, nrPCI_conf_vs_ref,  Check_nrPCI_conf_vs_ref,  RSS_conf_vs_ref, Check_RSS_conf_vs_ref, essScPairId,  essScLocalId, Check_DSS_2, tac_conf_vs_ref, Check_tac_conf_vs_ref, Date_Ref
from Comp_Conf_avatar_5G"""



query_5G_TDD = """

SELECT DISTINCT int_info_5g_tdd.Programme, int_info_5g_tdd.date_insertion, int_info_5g_tdd.SiteName , int_info_5g_tdd.cellname, int_info_5g_tdd.zone,
int_avatar_bdi_5g.Bande,
CASE WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Y' AND int_avatar_bdi_5g.Bande LIKE '%2100%' THEN 'OK'
    WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Q' AND int_avatar_bdi_5g.Bande LIKE '%3500%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno, 
 int_info_5g_tdd.Statut_Cell, int_info_5g_tdd.Statut_SectorCarrier,
CASE WHEN int_info_5g_tdd.noOfUsedTxAntennas IS NULL THEN 'NA/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas
     WHEN bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas IS NULL THEN int_info_5g_tdd.noOfUsedTxAntennas||'/NA'
     ELSE int_info_5g_tdd.noOfUsedTxAntennas||'/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas 
     END AS noOfUsedTxAntennas_Conf_vs_Ref,
CASE WHEN int_info_5g_tdd.noOfUsedTxAntennas IS NULL OR  bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas IS NULL THEN 'NA'
     WHEN int_info_5g_tdd.noOfUsedTxAntennas = bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas THEN 'OK'
     ELSE 'NOK'
     END AS Check_noOfUsedTxAntennas_Conf_vs_Ref,
CASE WHEN int_info_5g_tdd.noOfUsedRxAntennas IS NULL THEN 'NA/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas
     WHEN bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas IS NULL THEN int_info_5g_tdd.noOfUsedRxAntennas||'/NA'
     ELSE int_info_5g_tdd.noOfUsedRxAntennas||'/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas 
     END AS noOfUsedRxAntennas_Conf_vs_Ref,
CASE WHEN int_info_5g_tdd.noOfUsedRxAntennas IS NULL OR  bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas IS NULL THEN 'NA'
     WHEN int_info_5g_tdd.noOfUsedRxAntennas = bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas THEN 'OK'
     ELSE 'NOK'
     END AS Check_noOfUsedRxAntennas_Conf_vs_Ref,
int_info_5g_tdd.arfcndl ||'/'||int_avatar_bdi_5g.FrequenceDL AS arfcndl_conf_vs_ref ,  
CASE WHEN int_info_5g_tdd.arfcndl = int_avatar_bdi_5g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as Check_arfcndl_conf_vs_ref,
int_info_5g_tdd.arfcnul||'/'||int_avatar_bdi_5g.FrequenceUL AS arfcnul_conf_vs_ref,
CASE WHEN int_info_5g_tdd.arfcnul = int_avatar_bdi_5g.FrequenceUL THEN 'OK'
     ELSE 'NOK'
    END as Check_arfcnul_conf_vs_ref,
    
   int_info_5g_tdd.frequencyDL, int_info_5g_tdd.frequencyUL,

    
int_info_5g_tdd.bSChannelBwDL||'/'||int_avatar_bdi_5g.largeurbandedlimposee AS bSChannelBwDL_conf_vs_ref,
CASE WHEN int_info_5g_tdd.bSChannelBwDL = int_avatar_bdi_5g.largeurbandedlimposee  THEN 'OK'
     ELSE 'NOK'
    END as Check_bSChannelBwDL_conf_vs_ref,
int_info_5g_tdd.bSChannelBwUL||'/'|| int_avatar_bdi_5g.largeurbandeulimposee AS bSChannelBwUL_conf_vs_ref,
CASE WHEN int_info_5g_tdd.bSChannelBwUL = int_avatar_bdi_5g.largeurbandeulimposee THEN 'OK'
     ELSE 'NOK'
    END as Check_bSChannelBwUL_conf_vs_ref,
    
    int_info_5g_tdd.configuredmaxtxpower ||'/'|| bdr_ngran_erc_nrsectorCarrier.configuredMaxTxPower AS configuredMaxTxPower_Conf_vs_Ref,

CASE WHEN int_info_5g_tdd.configuredmaxtxpower LIKE bdr_ngran_erc_nrsectorCarrier.configuredMaxTxPower THEN 'OK'
    ELSE 'NOK'
    END AS Check_configuredMaxTxPower_Conf_vs_Ref,
    
Case WHEN int_info_5g_tdd.cellRange is Null and int_avatar_bdi_5g.CellRange is not null then 'NA/'||int_avatar_bdi_5g.CellRange
     WHEN int_info_5g_tdd.cellRange is not Null and int_avatar_bdi_5g.CellRange is null then int_info_5g_tdd.cellRange||'/NA'
     WHEN int_info_5g_tdd.cellRange is Null and int_avatar_bdi_5g.CellRange is null then 'NA/NA'
     else int_info_5g_tdd.cellRange||'/'||int_avatar_bdi_5g.CellRange 
     End AS CellRange_conf_vs_ref,
CASE WHEN int_info_5g_tdd.cellRange is null or  int_avatar_bdi_5g.CellRange is null THEN 'NA'
     WHEN int_info_5g_tdd.cellRange = int_avatar_bdi_5g.CellRange THEN 'OK'
     ELSE 'NOK'
    END as Check_CellRange_conf_vs_ref,
int_info_5g_tdd.nRPCI ||'/'|| int_avatar_bdi_5g.nrpci as nrPCI_conf_vs_ref, 
CASE WHEN  int_info_5g_tdd.nRPCI = int_avatar_bdi_5g.nrpci THEN 'OK'
     ELSE 'NOK'
    END as Check_nrPCI_conf_vs_ref,
    int_info_5g_tdd.rachRootSequence ||'/'|| int_avatar_bdi_5g.rrs as RSS_conf_vs_ref ,
CASE WHEN int_info_5g_tdd.rachRootSequence = int_avatar_bdi_5g.rrs THEN 'OK'
     ELSE 'NOK'
    END as Check_rachRootSequence_conf_vs_ref, 
CASE WHEN int_info_5g_tdd.nRTAC = '1' THEN 'OK'
     ELSE 'NOK'
    END as Check_nRTAC_conf_vs_ref,
    int_info_5g_tdd.gnbid ||'/'|| bdr_bdp_gnodeb.GNodeBId as gnbid_conf_vs_ref, 
CASE WHEN  int_info_5g_tdd.gnbid = bdr_bdp_gnodeb.GNodeBId THEN 'OK'
     ELSE 'NOK'
    END as Check_gnbid_conf_vs_ref, int_info_5g_tdd.base_bande, 
    
    
     Case WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Y' and int_info_5g_tdd.rru_cellule is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Q' and int_info_5g_tdd.rru_cellule is Null and Antenne_RET_elixir.Configuration is not null then 'NA/'||Antenne_RET_elixir.Configuration
     WHEN  LEFT(int_info_5g_tdd.cellname, 1) = 'Y' and int_info_5g_tdd.rru_cellule is not Null and Antenne_RET_elixir.Configuration_RF is null then int_info_5g_tdd.rru_cellule||'/NA'
     WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Y' and (int_info_5g_tdd.rru_cellule is Null or int_info_5g_tdd.rru_cellule = '')  and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     WHEN  LEFT(int_info_5g_tdd.cellname, 1) = 'Q' and int_info_5g_tdd.rru_cellule is not Null and Antenne_RET_elixir.Configuration is null then int_info_5g_tdd.rru_cellule||'/NA'
     WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Q' and (int_info_5g_tdd.rru_cellule is Null or int_info_5g_tdd.rru_cellule = '')  and Antenne_RET_elixir.Configuration is null then 'NA/NA'
     when  LEFT(int_info_5g_tdd.cellname, 1) = 'Q' and int_info_5g_tdd.rru_cellule is not Null and  Antenne_RET_elixir.Configuration is not null  then int_info_5g_tdd.rru_cellule||'/'||Antenne_RET_elixir.Configuration
     when  LEFT(int_info_5g_tdd.cellname, 1) = 'Y' and int_info_5g_tdd.rru_cellule is not Null and  Antenne_RET_elixir.Configuration_RF is not null  then int_info_5g_tdd.rru_cellule||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Y' and int_info_5g_tdd.rru_cellule is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA'
     WHEN LEFT(int_info_5g_tdd.cellname, 1) = 'Q' and int_info_5g_tdd.rru_cellule is Null or Antenne_RET_elixir.Configuration is null  then 'NA'
     WHEN  LEFT(int_info_5g_tdd.cellname, 1) = 'Y' and replace(Antenne_RET_elixir.Configuration_RF, '_', '') LIKE '%'||int_info_5g_tdd.rru_cellule||'%' THEN 'OK'
     WHEN  LEFT(int_info_5g_tdd.cellname, 1) = 'Q' and replace(Antenne_RET_elixir.Configuration, '_', '') LIKE '%'||int_info_5g_tdd.rru_cellule||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref
    
    ,int_info_5g_tdd.Date_Ref
   
FROM
  (((int_info_5g_tdd 
LEFT JOIN int_avatar_bdi_5g
ON int_info_5g_tdd.cellname = int_avatar_bdi_5g.CellName)  LEFT JOIN bdr_ngran_erc_nrsectorCarrier ON int_info_5g_tdd.cellname = bdr_ngran_erc_nrsectorCarrier.nRSectorCarrierId)LEFT JOIN bdr_bdp_gnodeb ON int_info_5g_tdd.SiteName = bdr_bdp_gnodeb.NEName) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = int_info_5g_tdd.cellname
"""

query_site_tdd = """ view_info_site_tdd.date_ref  , view_info_site_tdd.programme, view_info_site_tdd.date_insertion, view_info_site_tdd.sitename, view_info_site_tdd.zone, view_info_site_tdd.check_vlanPort_eran_e5_5g, view_info_site_tdd.baseband, view_info_site_tdd.eutranfreqrelation, view_info_site_tdd.software, view_info_site_tdd.check_software, view_info_site_tdd.userlabel, view_info_site_tdd.check_userlabel, view_info_site_tdd.gnbid, view_info_site_tdd.check_alarm, view_info_site_tdd.list_alarm, view_info_site_tdd.synchro_time_phase, view_info_site_tdd.check_synchro_time_phase, view_info_site_tdd.ipsec_5g_enabled_disabled, view_info_site_tdd.check_ipsec_5g_enabled_disabled, view_info_site_tdd.sfp, view_info_site_tdd.check_sfp, view_info_site_tdd.activation_compteur, view_info_site_tdd.check_activation_compteur, new_avatar_modif.sitetheorique, new_avatar_modif.synchro_8275 as synchro

From view_info_site_tdd LEFT JOIN new_avatar_modif ON view_info_site_tdd.sitename = new_avatar_modif.nename

"""
query_5G = """SELECT DISTINCT int_info_5g.Programme, int_info_5g.date_insertion, int_info_5g.SiteName , int_info_5g.cellname, int_info_5g.zone,
int_avatar_bdi_5g.Bande,
CASE WHEN LEFT(int_info_5g.cellname, 1) = 'Y' AND int_avatar_bdi_5g.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(int_info_5g.cellname, 1) = 'Q' AND int_avatar_bdi_5g.Bande LIKE '%3500%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno, 
CASE WHEN int_info_5g.noOfUsedTxAntennas IS NULL THEN 'NA/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas
     WHEN bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas IS NULL THEN int_info_5g.noOfUsedTxAntennas||'/NA'
     ELSE int_info_5g.noOfUsedTxAntennas||'/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas 
     END AS noOfUsedTxAntennas_Conf_vs_Ref,
CASE WHEN int_info_5g.noOfUsedTxAntennas IS NULL OR  bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas IS NULL THEN 'NA'
     WHEN int_info_5g.noOfUsedTxAntennas = bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas THEN 'OK'
     ELSE 'NOK'
     END AS Check_noOfUsedTxAntennas_Conf_vs_Ref,
CASE WHEN int_info_5g.noOfUsedRxAntennas IS NULL THEN 'NA/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas
     WHEN bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas IS NULL THEN int_info_5g.noOfUsedRxAntennas||'/NA'
     ELSE int_info_5g.noOfUsedRxAntennas||'/'||bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas 
     END AS noOfUsedRxAntennas_Conf_vs_Ref,
CASE WHEN int_info_5g.noOfUsedRxAntennas IS NULL OR  bdr_ngran_erc_nrsectorCarrier.noOfUsedTxAntennas IS NULL THEN 'NA'
     WHEN int_info_5g.noOfUsedRxAntennas = bdr_ngran_erc_nrsectorCarrier.noOfUsedRxAntennas THEN 'OK'
     ELSE 'NOK'
     END AS Check_noOfUsedRxAntennas_Conf_vs_Ref,
     
CASE WHEN int_info_5g.configuredmaxtxpower IS NULL THEN 'NA/'||rru_puissance_finale.Valeur
     WHEN rru_puissance_finale.Valeur IS NULL THEN int_info_5g.configuredmaxtxpower||'/NA'
     ELSE int_info_5g.configuredmaxtxpower ||'/'|| rru_puissance_finale.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,

CASE WHEN int_info_5g.configuredmaxtxpower IS NULL or rru_puissance_finale.Valeur IS NULL THEN 'NA'
    WHEN int_info_5g.configuredmaxtxpower LIKE rru_puissance_finale.Valeur||'000' THEN 'OK'
    ELSE 'NOK'
    END AS Check_configuredMaxTxPower_Conf_vs_Ref,
int_info_5g.bSChannelBwDL||'/'||int_avatar_bdi_5g.largeurbandedlimposee AS bSChannelBwDL_conf_vs_ref,
CASE WHEN int_info_5g.bSChannelBwDL = int_avatar_bdi_5g.largeurbandedlimposee  THEN 'OK'
     ELSE 'NOK'
    END as Check_bSChannelBwDL_conf_vs_ref,
int_info_5g.bSChannelBwUL||'/'|| int_avatar_bdi_5g.largeurbandeulimposee AS bSChannelBwUL_conf_vs_ref,
CASE WHEN int_info_5g.bSChannelBwUL = int_avatar_bdi_5g.largeurbandeulimposee THEN 'OK'
     ELSE 'NOK'
    END as Check_bSChannelBwUL_conf_vs_ref,
int_info_5g.arfcndl ||'/'||int_avatar_bdi_5g.FrequenceDL AS arfcndl_conf_vs_ref ,  
CASE WHEN int_info_5g.arfcndl = int_avatar_bdi_5g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as Check_arfcndl_conf_vs_ref,
int_info_5g .arfcnul||'/'||int_avatar_bdi_5g.FrequenceUL AS arfcnul_conf_vs_ref,
CASE WHEN int_info_5g.arfcnul = int_avatar_bdi_5g.FrequenceUL THEN 'OK'
     ELSE 'NOK'
    END as Check_arfcnul_conf_vs_ref,
Case WHEN int_info_5g.cellRange is Null and int_avatar_bdi_5g.CellRange is not null then 'NA/'||int_avatar_bdi_5g.CellRange
     WHEN int_info_5g.cellRange is not Null and int_avatar_bdi_5g.CellRange is null then int_info_5g.cellRange||'/NA'
     WHEN int_info_5g.cellRange is Null and int_avatar_bdi_5g.CellRange is null then 'NA/NA'
     else int_info_5g.cellRange||'/'||int_avatar_bdi_5g.CellRange 
     End AS CellRange_conf_vs_ref,
CASE WHEN int_info_5g.cellRange is null or  int_avatar_bdi_5g.CellRange is null THEN 'NA'
     WHEN int_info_5g.cellRange = int_avatar_bdi_5g.CellRange THEN 'OK'
     ELSE 'NOK'
    END as Check_CellRange_conf_vs_ref,
int_info_5g.PCI ||'/'|| int_avatar_bdi_5g.nrpci as nrPCI_conf_vs_ref, 
CASE WHEN  int_info_5g.PCI = int_avatar_bdi_5g.nrpci THEN 'OK'
     ELSE 'NOK'
    END as Check_nrPCI_conf_vs_ref,
    int_info_5g.RRS ||'/'|| int_avatar_bdi_5g.rrs as RSS_conf_vs_ref ,
CASE WHEN int_info_5g.RRS = int_avatar_bdi_5g.rrs THEN 'OK'
     ELSE 'NOK'
    END as Check_RSS_conf_vs_ref,
    int_info_5g.essScPairId,  int_info_5g.essScLocalId, int_info_5g.Check_DSS_2,
    
    CASE WHEN int_info_5g.tac  is null then 'NA/1'
     ELSE int_info_5g.tac||'/1'
    END as tac_conf_vs_ref,
CASE WHEN int_info_5g.tac is null then 'NA'
     WHEN int_info_5g.tac = '1' THEN 'OK'
     ELSE 'NOK'
    END as Check_tac_conf_vs_ref,
    
    
    int_info_5g.gnbid ||'/'|| bdr_bdp_gnodeb.GNodeBId as gnbid_conf_vs_ref, 
CASE WHEN int_info_5g.gnbid = bdr_bdp_gnodeb.GNodeBId THEN 'OK'
     ELSE 'NOK'
    END as Check_gnbid_conf_vs_ref,
    
    int_info_5g.base_bande, 
    
Case WHEN int_info_5g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN int_info_5g.Rf_Conf is not Null and Antenne_RET_elixir.Configuration_RF is null then int_info_5g.Rf_Conf||'/NA'
     WHEN (int_info_5g.Rf_Conf is Null or int_info_5g.Rf_Conf = '')  and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else int_info_5g.Rf_Conf||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN int_info_5g.Rf_Conf is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA/'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||int_info_5g.Rf_Conf||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref,
    
    int_info_5g.Date_Ref
   
FROM
  (((((int_info_5g 
LEFT JOIN int_avatar_bdi_5g 
ON int_info_5g.cellname = int_avatar_bdi_5g.CellName) LEFT JOIN  optim_taclac ON int_info_5g.SiteName = optim_taclac.enodebname and optim_taclac.TAC_LIST like '%3G%') LEFT JOIN bdr_ngran_erc_nrsectorCarrier ON int_info_5g.cellname = bdr_ngran_erc_nrsectorCarrier.nRSectorCarrierId)  LEFT JOIN bdr_bdp_gnodeb ON int_info_5g.SiteName = bdr_bdp_gnodeb.NEName) LEFT JOIN rru_puissance_finale ON rru_puissance_finale.cellname = int_info_5g.cellname)
 LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = int_info_5g.cellname
"""

query_2G = """SELECT DISTINCT int_info_2g.Date_Ref , int_info_2g.Programme , int_info_2g.date_insertion , int_info_2g.SiteName , int_info_2g.cellname , int_avatar_bdi_2g.BandeFreq as BandFreq,
int_info_2g.zone , int_info_2g.secteur , int_info_2g.TRX , int_info_2g.Statut , 
CASE WHEN LEFT(int_info_2g.cellname, 1) = 'C' AND int_avatar_bdi_2g.BandeFreq LIKE '%900%' THEN 'OK'
     WHEN LEFT(int_info_2g.cellname, 1) = 'B' AND int_avatar_bdi_2g.BandeFreq LIKE '%1800%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno,int_info_2g.Statut_Tx_Rx_TsState_TsOper, int_info_2g.frequencyBand , 
CASE WHEN int_info_2g.configuredMaxTxPower IS NULL THEN 'NA/'||rru_puissance_finale_2G.Valeur
     WHEN rru_puissance_finale_2G.Valeur IS NULL  THEN int_info_2g.configuredMaxTxPower||'/NA'
     ELSE int_info_2g.configuredMaxTxPower||'/'||rru_puissance_finale_2G.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,
CASE WHEN int_info_2g.configuredMaxTxPower IS NULL OR rru_puissance_finale_2G.Valeur IS NULL THEN 'NA'
     WHEN  int_info_2g.configuredMaxTxPower = rru_puissance_finale_2G.Valeur||'000' THEN 'OK'
     ELSE 'NOK'
     END AS Check_configuredMaxTxPower_Conf_vs_Ref,
     int_info_2g.noOfRxAntennas, int_info_2g.noOfTxAntennas, int_info_2g.abisAtState, int_info_2g.bscNodeIdentity, 
     
int_info_2g.noOfTxAntennas ||'T'|| int_info_2g.noOfRxAntennas || 'R'as TxRx_Conf , 
CASE WHEN rr_int_cellule.ConfigurationTxRx_REF is null then 'NA'
     ELSE rr_int_cellule.ConfigurationTxRx_REF
     END AS TxRx_Ref,
CASE WHEN int_info_2g.noOfTxAntennas || 'T'||int_info_2g.noOfRxAntennas||'R' like LEFT(rr_int_cellule.ConfigurationTxRx_REF,4) THEN 'OK'
     WHEN rr_int_cellule.ConfigurationTxRx_REF IS NULL THEN "NA"
     ELSE 'NOK'
     END AS Check_TxRx_Conf_vs_Ref,  
int_info_2g.TsState , int_info_2g.Check_TsState , int_info_2g.TsOper, int_info_2g.Check_TsOper,
int_info_2g.base_bande, 
Case WHEN int_info_2g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN int_info_2g.Rf_Conf is not Null and Antenne_RET_elixir.Configuration_RF is null then int_info_2g.Rf_Conf||'/NA'
     WHEN int_info_2g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else int_info_2g.Rf_Conf||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN int_info_2g.Rf_Conf is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA/'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||int_info_2g.Rf_Conf||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref
FROM ((((int_info_2g LEFT JOIN int_avatar_bdi_2g ON int_info_2g.cellname = int_avatar_bdi_2g.cellname) 
LEFT JOIN  bdr_geran_erc_trx ON int_info_2g.cellname = bdr_geran_erc_trx.gsmSectorId) 
LEFT JOIN rr_int_cellule ON int_info_2g.cellname = rr_int_cellule.cellname) LEFT JOIN rru_puissance_finale_2G ON rru_puissance_finale_2G.cellname =int_info_2g.cellname) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = int_info_2g.cellname """

query_3G = """

SELECT DISTINCT int_info_3g.Date_Ref, int_info_3g.Programme, int_info_3g.date_insertion, int_info_3g.SiteName, int_info_3g.cellname, int_info_3g.zone, int_info_3g.secteur, int_info_3g.userLabel, int_info_3g.Statut_Cell, int_info_3g.operatingBand, 

int_info_3g.numOfTxAntennas ||'T'|| int_info_3g.numOfRxAntennas || 'R'as TxRx_Conf , rr_int_cellule.ConfigurationTxRx_REF AS TxRx_Ref,
CASE WHEN int_info_3g.numOfTxAntennas || 'T'||int_info_3g.numOfRxAntennas||'R' like LEFT(rr_int_cellule.ConfigurationTxRx_REF,4) THEN 'OK'
     WHEN rr_int_cellule.ConfigurationTxRx_REF IS NULL THEN 'NA'
     ELSE 'NOK'
     END AS Check_TxRx_Conf_vs_Ref,
      

int_info_3g.uarfcndl ||'/'||int_avatar_bdi_3g.FrequenceDL AS uarfcndl_conf_vs_ref ,  
CASE WHEN int_info_3g.uarfcndl = int_avatar_bdi_3g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as Check_uarfcndl_conf_vs_ref,
int_info_3g .uarfcnul||'/'||int_avatar_bdi_3g.FrequenceUL AS uarfcnul_conf_vs_ref,
CASE WHEN int_info_3g.uarfcnUl = int_avatar_bdi_3g.FrequenceUL THEN 'OK'
     ELSE 'NOK'
    END as Check_uarfcnUl_conf_vs_ref,

int_info_3g.localCellId, 

CASE WHEN int_info_3g.configuredMaxTxPower IS NULL THEN 'NA/'||rru_puissance_finale_3G.Valeur 
     WHEN rru_puissance_finale_3G.Valeur IS NULL THEN int_info_3g.configuredMaxTxPower||'/NA'
     ELSE int_info_3g.configuredMaxTxPower||'/'||rru_puissance_finale_3G.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,
CASE WHEN  int_info_3g.configuredMaxTxPower IS NULL or rru_puissance_finale_3G.Valeur IS NULL THEN 'NA'
     WHEN int_info_3g.configuredMaxTxPower = rru_puissance_finale_3G.Valeur||'000' THEN 'OK'
     ELSE 'NOK'
     END AS Check_configuredMaxTxPower_Conf_vs_Ref,     


int_info_3g.bandwidthDl||'/46'  AS bandwidthDl_conf_vs_ref,
CASE WHEN int_info_3g.bandwidthDl = '46'  THEN 'OK'
     ELSE 'NOK'
    END as Check_bandwidthDl_conf_vs_ref,
int_info_3g.bandwidthUl||'/'||int_avatar_bdi_3g.largeurbandeulimposee AS bandwidthUl_conf_vs_ref,
CASE WHEN int_info_3g.bandwidthUl ||'0' LIKE split(int_avatar_bdi_3g.largeurbandeulimposee,',')[0]||split(int_avatar_bdi_3g.largeurbandeulimposee,',')[1] or int_info_3g.bandwidthUl LIKE split(int_avatar_bdi_3g.largeurbandeulimposee,',')[0]||split(int_avatar_bdi_3g.largeurbandeulimposee,',')[1]  THEN 'OK'
     ELSE 'NOK'
    END as Check_bandwidthUl_conf_vs_ref,

Case WHEN int_info_3g.cellRange is Null and bdr_utran_erc_nodeb.cellRange  is not null then 'NA/'||bdr_utran_erc_nodeb.cellRange
     WHEN int_info_3g.cellRange is not Null and bdr_utran_erc_nodeb.cellRange is null then int_info_3g.cellRange||'/NA'
     WHEN int_info_3g.cellRange is Null and bdr_utran_erc_nodeb.cellRange is null then 'NA/NA'
     else int_info_3g.cellRange||'/'||bdr_utran_erc_nodeb.cellRange
     End AS CellRange_conf_vs_ref,
CASE WHEN int_info_3g.cellRange is null or  bdr_utran_erc_nodeb.cellRange is null THEN 'NA'
     WHEN int_info_3g.cellRange = bdr_utran_erc_nodeb.cellRange THEN 'OK'
     ELSE 'NOK'
    END as Check_CellRange_conf_vs_ref, int_info_3g.base_bande, 
    
Case WHEN int_info_3g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN int_info_3g.Rf_Conf is not Null and Antenne_RET_elixir.Configuration_RF is null then int_info_3g.Rf_Conf||'/NA'
     WHEN int_info_3g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else int_info_3g.Rf_Conf||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN int_info_3g.Rf_Conf is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA/'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||int_info_3g.Rf_Conf||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref


From ((((int_info_3g LEFT JOIN int_avatar_bdi_3g ON int_info_3g.userLabel = int_avatar_bdi_3g.cellname) 
LEFT JOIN  bdr_utran_erc_nodeb ON int_info_3g.cellname = bdr_utran_erc_nodeb.nodeBLocalCellId and int_info_3g.SiteName = bdr_utran_erc_nodeb.NeName) 
LEFT JOIN rr_int_cellule ON int_info_3g.userLabel = rr_int_cellule.cellname) LEFT JOIN rru_puissance_finale_3G ON rru_puissance_finale_3G.userLabel =int_info_3g.userLabel) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = int_info_3g.userLabel
"""

query_4G = """SELECT DISTINCT int_info_4g.Programme, int_info_4g.date_insertion, int_info_4g.SiteName  , int_info_4g.cellname ,int_info_4g.zone,
int_avatar_bdi_4g.Bande,

int_info_4g.TX ||'T'||int_info_4g.RX||'R' AS MIMO_Conf, rr_int_cellule.configurationtxrx_ref AS Mimo_ref,
CASE WHEN int_info_4g.TX || 'T'|| int_info_4g.RX || 'R' LIKE  LEFT(rr_int_cellule.configurationtxrx_ref,4) THEN 'OK'
     ELSE 'NOK'
     END AS Check_Mimo_conf_vs_ref,
CASE WHEN LEFT(int_info_4g.cellname, 1) = 'P' AND int_avatar_bdi_4g.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'L' AND int_avatar_bdi_4g.Bande LIKE '%2600%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'K' AND int_avatar_bdi_4g.Bande LIKE '%700%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'D' AND int_avatar_bdi_4g.Bande LIKE '%1800%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'T' AND int_avatar_bdi_4g.Bande LIKE '%800%' AND int_avatar_bdi_4g.Bande NOT LIKE '%1800%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno,
CASE WHEN int_info_4g.configuredmaxtxpower IS NULL THEN 'NA/'||rru_puissance_finale_4G.Valeur
     WHEN rru_puissance_finale_4G.Valeur IS NULL THEN int_info_4g.configuredmaxtxpower||'/NA'
     ELSE int_info_4g.configuredmaxtxpower ||'/'|| rru_puissance_finale_4G.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,

CASE WHEN int_info_4g.configuredmaxtxpower IS NULL or rru_puissance_finale_4G.Valeur IS NULL THEN 'NA'
    WHEN int_info_4g.configuredmaxtxpower LIKE rru_puissance_finale_4G.Valeur||'000' THEN 'OK'
    ELSE 'NOK'
    END AS Check_configuredMaxTxPower_Conf_vs_Ref,
int_info_4g.dlChannelBandwidth||'/'||  int_avatar_bdi_4g.LargeurBandeDL as DLchbandwidth_conf_vs_ref,
CASE WHEN int_info_4g.dlChannelBandwidth = int_avatar_bdi_4g.LargeurBandeDL || '000' THEN 'OK'
     ELSE 'NOK'
    END as Check_DLchbandwidth_conf_vs_ref,
int_info_4g.ulChannelBandwidth ||'/'||int_avatar_bdi_4g.LargeurBandeUL as ULchbandwidth_conf_vs_ref,
CASE WHEN int_info_4g.ulChannelBandwidth = int_avatar_bdi_4g.LargeurBandeUL || '000' THEN 'OK'
     ELSE 'NOK'
    END as Check_ULchbandwidth_conf_vs_ref,
int_info_4g.earfcndl || '/'|| int_avatar_bdi_4g.FrequenceDL as earfcndl_conf_vs_ref, 
CASE WHEN int_info_4g.earfcndl = int_avatar_bdi_4g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as check_earfcndl_conf_vs_ref,
int_info_4g.earfcnul|| '/'||int_avatar_bdi_4g.FrequenceUL as earfcnul_conf_vs_ref, 
CASE WHEN int_info_4g.earfcnul = int_avatar_bdi_4g.FrequenceUL THEN 'OK'
     ELSE 'NOK'
    END as Check_earfcnul_conf_vs_ref,
    
Case WHEN  int_info_4g.cellrange is Null and int_avatar_bdi_4g.cellrange  is not null then 'NA/'||int_avatar_bdi_4g.cellrange
     WHEN  int_info_4g.cellrange is not Null and int_avatar_bdi_4g.cellrange is null then  int_info_4g.cellrange||'/NA'
     WHEN  int_info_4g.cellrange is Null and int_avatar_bdi_4g.cellrange is null then 'NA/NA'
     else  int_info_4g.cellrange||'/'||int_avatar_bdi_4g.cellrange
     End AS CellRange_conf_vs_ref,
CASE WHEN  int_info_4g.cellrange is null or  int_avatar_bdi_4g.cellrange is null THEN 'NA'
     WHEN  int_info_4g.cellrange = int_avatar_bdi_4g.cellrange THEN 'OK'
     ELSE 'NOK'
    END as Check_CellRange_conf_vs_ref,
 int_info_4g.physicalLayerCellId ||'/'|| int_avatar_bdi_4g.PCI as PCI_conf_vs_ref,
CASE WHEN int_info_4g.physicalLayerCellId = int_avatar_bdi_4g.PCI THEN 'OK'
     ELSE 'NOK'
    END as Check_PCI_conf_vs_ref,
 int_avatar_bdi_4g.NbrRRS,
 int_info_4g.rachRootSequence ||'/'||int_avatar_bdi_4g.RRS as RSS_conf_vs_ref ,
CASE WHEN int_info_4g.rachRootSequence = int_avatar_bdi_4g.RRS THEN 'OK'
     ELSE 'NOK'
    END as Check_RSS_conf_vs_ref,
    int_info_4g.essScPairId,  int_info_4g.essScLocalId, int_info_4g.Check_DSS_2,
    
CASE WHEN int_info_4g.tac is NULL and optim_taclac.tac is NOT NULL THEN 'NA/'||optim_taclac.tac
     WHEN int_info_4g.tac is NOT NULL and optim_taclac.tac is NULL THEN int_info_4g.tac||'/NA'
     WHEN int_info_4g.tac is NULL and optim_taclac.tac is NULL THEN 'NA/NA'
     ELSE int_info_4g.tac  || '/'  || optim_taclac.tac  
     END as tac_conf_vs_ref, 
CASE WHEN int_info_4g.tac is NULL or optim_taclac.tac is NULL THEN 'NA'
     WHEN int_info_4g.tac = optim_taclac.tac THEN 'OK'
     ELSE 'NOK'
    END as Check_tac_conf_vs_ref,
CASE WHEN  int_info_4g.enbid is Null and int_optim_enodebid.ENODEBID  is not null then 'NA/'||int_optim_enodebid.ENODEBID
     WHEN  int_info_4g.enbid is not Null and int_optim_enodebid.ENODEBID  is Null then int_info_4g.enbid||'/NA'
    WHEN  int_info_4g.enbid is Null and int_optim_enodebid.ENODEBID  is null then 'NA/NA'
     else int_info_4g.enbid ||'/'|| int_optim_enodebid.ENODEBID 
     END as enbid_conf_vs_ref, 
CASE WHEN int_info_4g.enbid is Null or  int_optim_enodebid.ENODEBID is Null  then 'NA'
     WHEN int_info_4g.enbid = int_optim_enodebid.ENODEBID THEN 'OK'
     ELSE 'NOK'
    END as Check_enbid_conf_vs_ref,  
    int_info_4g.base_bande, 
    Case WHEN int_info_4g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN int_info_4g.Rf_Conf is not Null and Antenne_RET_elixir.Configuration_RF is null then int_info_4g.Rf_Conf||'/NA'
     WHEN int_info_4g.Rf_Conf is Null and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else int_info_4g.Rf_Conf||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN int_info_4g.Rf_Conf is Null or Antenne_RET_elixir.Configuration_RF is null then 'NA'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||int_info_4g.Rf_Conf||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref, 
    int_info_4g.Date_Ref
FROM
  ((((((int_info_4g 
LEFT JOIN int_avatar_bdi_4g 
ON int_info_4g.cellname = int_avatar_bdi_4g.cellname) LEFT JOIN  optim_taclac ON int_info_4g.SiteName = optim_taclac.enodebname and optim_taclac.TAC_LIST like '%3G%') LEFT JOIN  bdr_eutran_erc_sectorCarrier ON int_info_4g.cellname = bdr_eutran_erc_sectorCarrier.SectorCarrierId) LEFT JOIN int_optim_enodebid ON int_info_4g.SiteName = int_optim_enodebid.ENODEBNAME) LEFT JOIN rru_puissance_finale_4G ON rru_puissance_finale_4G.cellname = int_info_4g.cellname) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = int_info_4g.cellname) LEFT JOIN rr_int_cellule ON int_info_4g.cellname = rr_int_cellule.cellname"""

query_licence_alarm_ngs = """SELECT DISTINCT int_info_site.Programme, int_info_site.date_insertion, int_info_site.SiteName,   int_info_site.zone, int_info_site.licence, int_info_site.check_licence, int_info_site.administrativestate, int_info_site.check_administrativestate ,int_info_site.syncNodePriority ,int_info_site.syncRiPortStatus ,
int_info_site.check_synchronisation, int_info_site.List_alarm, int_info_site.check_alarm, int_info_site.Missing_RET, int_info_site.check_Missing_RET, int_info_site.RET_BB_vs_Antenna_matching, int_info_site.check_RET_BB_vs_Antenna_matching, int_info_site.RET_Connectors, int_info_site.Check_RET_Connectors, valeur_ret, check_valeur_ret,
int_info_site.userlabel, int_info_site.check_userlabel, int_info_site.Date_Ref
FROM
  int_info_site"""

query_mimo_handover_perf = """SELECT DISTINCT int_info_4g.Programme, int_info_4g.date_insertion, int_info_4g.SiteName  , int_info_4g.cellname , int_info_4g.zone,
int_info_4g.TX ||'T'||int_info_4g.RX||'R' AS MIMO_Conf, rr_int_cellule.configurationtxrx_ref AS Mimo_ref,
CASE WHEN int_info_4g.TX || 'T'|| int_info_4g.RX || 'R' LIKE  LEFT(rr_int_cellule.configurationtxrx_ref,4) THEN 'OK'
     ELSE 'NOK'
     END AS Check_Mimo_conf_vs_ref,
Case WHEN int_info_4g.qRxLevMin is null and BDR_Erc_EutranCellFDD.qRxLevMin is not null THEN 'NA/'||int_info_4g.qRxLevMin
     WHEN int_info_4g.qRxLevMin is not null and BDR_Erc_EutranCellFDD.qRxLevMin is null THEN BDR_Erc_EutranCellFDD.qRxLevMin||'/NA'
     WHEN int_info_4g.qRxLevMin is null and BDR_Erc_EutranCellFDD.qRxLevMin is null THEN 'NA/NA'
     ELSE int_info_4g.qRxLevMin  || '/'  || BDR_Erc_EutranCellFDD.qRxLevMin 
     END as qRxLevMin_conf_vs_ref,
CASE WHEN int_info_4g.qRxLevMin is null or BDR_Erc_EutranCellFDD.qRxLevMin is null THEN 'NA'
     WHEN int_info_4g.qRxLevMin = BDR_Erc_EutranCellFDD.qRxLevMin THEN 'OK'
     ELSE 'NOK'
     END AS Check_qRxLevMin_conf_vs_ref,
CASE WHEN int_info_4g.TX = '4' and int_info_4g.pmRadioTxRankDistr = '4' THEN 'OK'
     WHEN int_info_4g.TX = '2' and int_info_4g.pmRadioTxRankDistr = '2' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Performance, int_info_4g.Date_Ref
FROM
 (int_info_4g LEFT JOIN rr_int_cellule ON int_info_4g.cellname = rr_int_cellule.cellname) LEFT JOIN BDR_Erc_EutranCellFDD ON int_info_4g.cellname = BDR_Erc_EutranCellFDD.cellname"""


query_info_eran = """SELECT DISTINCT int_info_4g.Programme, int_info_4g.date_insertion, int_info_4g.SiteName , int_info_4g.zone, int_info_site.EUtranFreqRelation as EUtranFreqRelation_NOK, int_info_site.Interco, int_info_site.Synchro_Time_Phase, int_info_site.Check_Synchro_Time_Phase, int_info_site.Activation_Compteur, int_info_site.Check_Activation_Compteur, int_info_site.IPSEC_4G_Enabled_Disabled, int_info_site.Check_IPSEC_4G_Enabled_Disabled, int_info_site.IPSEC_5G_Enabled_Disabled, int_info_site.Check_IPSEC_5G_Enabled_Disabled, 
int_info_site.DSS_Check_3 , int_info_site.Check_DSS_Check_3, int_info_site.SFP, int_info_site.Check_SFP, 
info_site_dss.Inner_LTE_IP_Conf_vs_Ref,
info_site_dss.Check_Inner_LTE_IP_Conf_vs_Ref,
info_site_dss.Inner_5G_IP_Conf_vs_Ref,
info_site_dss.Check_Inner_5G_IP_Conf_vs_Ref
,int_info_site.Mapping_Rfport, int_info_site.Check_Mapping_Rfport

,int_info_4g.Date_Ref
FROM
  (int_info_4g LEFT JOIN int_info_site ON int_info_4g.SiteName = int_info_site.SiteName) LEFT JOIN info_site_dss  ON int_info_4g.SiteName = info_site_dss.SiteName"""

query_DSS = """
SELECT int_info_site.SiteName, int_info_site.Inner_LTE_IP , int_info_site.Inner_5G_IP, int_drim_interfaces_ip.ADR_IP_V4, 

tab_4G.Inner_LTE_IP_Conf_vs_Ref, tab_4G.Check_Inner_LTE_IP_Conf_vs_Ref ,tab_5G.Inner_5G_IP_Conf_vs_Ref , tab_5G.Check_Inner_5G_IP_Conf_vs_Ref

 
from (int_drim_interfaces_ip LEFT JOIN int_info_site ON int_drim_interfaces_ip.PORTEUR = int_info_site.SiteName
 LEFT JOIN (SELECT int_info_site.SiteName , int_info_site.Inner_5G_IP,     
CASE WHEN  int_drim_interfaces_ip.NOM_VLAN   LIKE '%LOOPBACK_5G%' AND int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0] THEN int_info_site.Inner_5G_IP ||'/'||int_drim_interfaces_ip.ADR_IP_V4  
     ELSE ''
     END AS Inner_5G_IP_Conf_vs_Ref,
  
CASE WHEN  int_drim_interfaces_ip.NOM_VLAN  LIKE '%LOOPBACK_5G%' AND int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0] AND int_drim_interfaces_ip.ADR_IP_V4  = split(int_info_site.Inner_5G_IP, '/')[0]  THEN 'OK'
     WHEN int_drim_interfaces_ip.NOM_VLAN  LIKE '%LOOPBACK_5G%' AND int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0] AND int_drim_interfaces_ip.ADR_IP_V4 IS NULL or int_info_site.Inner_5G_IP =''  THEN 'NA'
     ELSE 'NOK'
     END AS Check_Inner_5G_IP_Conf_vs_Ref
 
from int_drim_interfaces_ip LEFT JOIN int_info_site ON int_drim_interfaces_ip.PORTEUR = int_info_site.SiteName
WHERE  int_drim_interfaces_ip.NOM_VLAN like '%LOOPBACK_5G%' and int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0]) as tab_5G ON int_info_site.SiteName = tab_5G.SiteName) Left JOIN  

(select int_info_site.SiteName, int_info_site.Inner_LTE_IP , int_drim_interfaces_ip.ADR_IP_V4,
            CASE WHEN  int_drim_interfaces_ip.NOM_VLAN  LIKE '%LTE_UPCP%' AND int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0]  THEN int_info_site.Inner_LTE_IP ||'/'||int_drim_interfaces_ip.ADR_IP_V4  
     ELSE ''
     END AS Inner_LTE_IP_Conf_vs_Ref,
     CASE WHEN  int_drim_interfaces_ip.NOM_VLAN   LIKE '%LTE_UPCP%'   AND int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0] AND int_drim_interfaces_ip.ADR_IP_V4 = split(int_info_site.Inner_LTE_IP, '/')[0]  THEN 'OK'
     WHEN int_drim_interfaces_ip.NOM_VLAN LIKE '%LTE_UPCP%' AND int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0] AND int_drim_interfaces_ip.ADR_IP_V4 IS NULL or  int_info_site.Inner_LTE_IP = ''  THEN 'NA'
     ELSE 'NOK'
     END AS Check_Inner_LTE_IP_Conf_vs_Ref
     from int_info_site LEFT JOIN int_drim_interfaces_ip ON int_drim_interfaces_ip.PORTEUR = int_info_site.SiteName
WHERE int_drim_interfaces_ip.NOM_VLAN like '%LTE_UPCP%' and int_info_site.SiteName LIKE split(NOM_INTERFACE, '_')[0]) as tab_4G ON int_info_site.SiteName = tab_4G.SiteName
"""
query_info_4G_gen = """SELECT DISTINCT int_info_4g.Programme, int_info_4g.date_insertion, int_info_4g.SiteName  , int_info_4g.cellname, int_info_4g.zone, int_avatar_bdi_4g.Bande,
CASE WHEN LEFT(int_info_4g.cellname, 1) = 'P' AND int_avatar_bdi_4g.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'L' AND int_avatar_bdi_4g.Bande LIKE '%2600%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'K' AND int_avatar_bdi_4g.Bande LIKE '%700%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'D' AND int_avatar_bdi_4g.Bande LIKE '%1800%' THEN 'OK'
     WHEN LEFT(int_info_4g.cellname, 1) = 'T' AND int_avatar_bdi_4g.Bande LIKE '%800%' AND int_avatar_bdi_4g.Bande NOT LIKE '%1800%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno,
 int_info_4g.transmissionMode,
CASE WHEN int_info_4g.transmissionMode LIKE '%4%' THEN 'OK'
     ELSE 'NOK'
     END AS check_transmissionMode,
int_info_4g.crsGain ||'/'||  BDR_Erc_EutranCellFDD.crsGain as crsGain_conf_vs_ref, 
CASE WHEN int_info_4g.crsGain = BDR_Erc_EutranCellFDD.crsGain THEN 'OK'
     ELSE 'NOK'
     END AS Check_crsGain_conf_vs_ref,
     int_info_4g.pdschTypeBGain ||'/'|| BDR_Erc_EutranCellFDD.pdschTypeBGain as pdschTypeBGain_conf_vs_ref,
CASE WHEN int_info_4g.pdschTypeBGain = BDR_Erc_EutranCellFDD.pdschTypeBGain THEN 'OK'
     ELSE 'NOK'
     END AS Check_pdschTypeBGain_conf_vs_ref,
int_info_4g.tac  || '/'  || optim_taclac.tac  as tac_conf_vs_ref, 
CASE WHEN int_info_4g.tac = optim_taclac.tac THEN 'OK'
     ELSE 'NOK'
    END as Check_tac_conf_vs_ref,
int_avatar_bdi_4g.NbrRRS,  int_info_4g.physicalLayerCellId ||'/'|| int_avatar_bdi_4g.PCI  as PCI_conf_vs_ref,
CASE WHEN  int_info_4g.physicalLayerCellId = int_avatar_bdi_4g.PCI THEN 'OK'
     ELSE 'NOK'
    END as Check_PCI_conf_vs_ref,
int_info_4g.rachRootSequence ||'/'|| int_avatar_bdi_4g.RRS  as RRS_conf_vs_ref ,
CASE WHEN int_info_4g.rachRootSequence = int_avatar_bdi_4g.RRS THEN 'OK'
     ELSE 'NOK'
    END as Check_RRS_conf_vs_ref, int_info_site.baseband AS productName , int_info_site.software, int_info_site.check_software, int_info_site.enbid ||'/'|| int_optim_enodebid.ENODEBID as enbid_conf_vs_ref, 
CASE WHEN int_info_site.enbid = int_optim_enodebid.ENODEBID THEN 'OK'
     ELSE 'NOK'
    END as Check_enbid_conf_vs_ref, int_info_4g.Date_Ref, 
CASE WHEN int_info_site.Antenna_name is null or int_info_site.Antenna_name = '' THEN 'NA/'|| Antenne_RET_elixir.Configuration
     WHEN Antenne_RET_elixir.Configuration is null THEN int_info_site.Antenna_name||'/NA'
     ELSE int_info_site.Antenna_name||'/'||Antenne_RET_elixir.Configuration
     END as Antenne_Conf_vs_Ref,
     
     
CASE WHEN int_info_site.Antenna_name is null or Antenne_RET_elixir.Configuration is null THEN 'NA'
     WHEN Antenne_RET_elixir.Configuration LIKE '%'||int_info_site.Antenna_name||'%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Antenne_Conf_vs_Ref
FROM
  ((((((int_info_4g 
LEFT JOIN int_avatar_bdi_4g 
ON int_info_4g.cellname = int_avatar_bdi_4g.cellname) LEFT JOIN  optim_taclac ON int_info_4g.SiteName = optim_taclac.enodebname and optim_taclac.TAC_LIST like '%3G%') LEFT JOIN rr_int_cellule ON int_info_4g.cellname = rr_int_cellule.cellname) LEFT JOIN int_info_site ON  int_info_4g.SiteName = int_info_site.SiteName) LEFT JOIN int_optim_enodebid ON int_info_4g.SiteName = int_optim_enodebid.ENODEBNAME) LEFT JOIN BDR_Erc_EutranCellFDD ON int_info_4g.cellname = BDR_Erc_EutranCellFDD.cellname) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = int_info_4g.cellname"""


query_info_gen_4G_huw = """SELECT DISTINCT info_gen_4g_huw.date_insertion, info_gen_4g_huw.Programme, info_gen_4g_huw.zone, info_gen_4g_huw.Cell_ID, info_gen_4g_huw.sitename,  info_gen_4g_huw.cellname, info_gen_4g_huw.Bande,

CASE WHEN LEFT(info_gen_4g_huw.cellname, 1) = 'P' AND info_gen_4g_huw.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(info_gen_4g_huw.cellname, 1) = 'L' AND info_gen_4g_huw.Bande LIKE '%2600%' THEN 'OK'
     WHEN LEFT(info_gen_4g_huw.cellname, 1) = 'K' AND info_gen_4g_huw.Bande LIKE '%700%' THEN 'OK'
     WHEN LEFT(info_gen_4g_huw.cellname, 1) = 'D' AND info_gen_4g_huw.Bande LIKE '%1800%' THEN 'OK'
     WHEN LEFT(info_gen_4g_huw.cellname, 1) = 'T' AND info_gen_4g_huw.Bande LIKE '%800%' AND info_gen_4g_huw.Bande NOT LIKE '%1800%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno
,info_gen_4g_huw.Operateur,



CASE when info_gen_4g_huw.DL_EARFCN is null and int_avatar_bdi_4g.FrequenceDL is not null then  'NA/'|| int_avatar_bdi_4g.FrequenceDL
     when info_gen_4g_huw.DL_EARFCN is not null and int_avatar_bdi_4g.FrequenceDL is null then  info_gen_4g_huw.DL_EARFCN||'/NA'
     when info_gen_4g_huw.DL_EARFCN is  null and int_avatar_bdi_4g.FrequenceDL is null then 'NA/NA'
     else info_gen_4g_huw.DL_EARFCN || '/'|| int_avatar_bdi_4g.FrequenceDL 
     end as earfcndl_conf_vs_ref, 
CASE WHEN info_gen_4g_huw.DL_EARFCN is null or int_avatar_bdi_4g.FrequenceDL is null THEN 'NA'
     WHEN info_gen_4g_huw.DL_EARFCN = int_avatar_bdi_4g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as Check_earfcndl_conf_vs_ref,

    
 CASE when info_gen_4g_huw.DL_BWidth is null and int_avatar_bdi_4g.LargeurBandeDL  is not null then  'NA/'|| int_avatar_bdi_4g.LargeurBandeDL
     when info_gen_4g_huw.DL_BWidth is not null and int_avatar_bdi_4g.LargeurBandeDL  is null then  info_gen_4g_huw.DL_BWidth||'/NA'
     when info_gen_4g_huw.DL_BWidth is  null and int_avatar_bdi_4g.LargeurBandeDL is null then 'NA/NA'
     else info_gen_4g_huw.DL_BWidth || '/'|| int_avatar_bdi_4g.LargeurBandeDL 
     end as DL_BWidth_conf_vs_ref, 
CASE WHEN info_gen_4g_huw.DL_BWidth is null or int_avatar_bdi_4g.LargeurBandeDL is null THEN 'NA'
     WHEN info_gen_4g_huw.DL_BWidth = int_avatar_bdi_4g.LargeurBandeDL||'M' THEN 'OK'
     ELSE 'NOK'
    END as Check_DL_BWidth_conf_vs_ref,


CASE when info_gen_4g_huw.UL_BWidth is null and int_avatar_bdi_4g.LargeurBandeUL  is not null then  'NA/'|| int_avatar_bdi_4g.LargeurBandeUL
     when info_gen_4g_huw.UL_BWidth is not null and int_avatar_bdi_4g.LargeurBandeUL  is null then  info_gen_4g_huw.UL_BWidth||'/NA'
     when info_gen_4g_huw.UL_BWidth is  null and int_avatar_bdi_4g.LargeurBandeUL is null then 'NA/NA'
     else info_gen_4g_huw.UL_BWidth || '/'|| int_avatar_bdi_4g.LargeurBandeUL 
     end as UL_BWidth_conf_vs_ref, 
CASE WHEN info_gen_4g_huw.UL_BWidth is null or int_avatar_bdi_4g.LargeurBandeUL is null THEN 'NA'
     WHEN info_gen_4g_huw.UL_BWidth = int_avatar_bdi_4g.LargeurBandeUL||'M' THEN 'OK'
     ELSE 'NOK'
    END as Check_UL_BWidth_conf_vs_ref
,info_gen_4g_huw.Cust_BWidth, info_gen_4g_huw.UL_Cust_BWidth, info_gen_4g_huw.DL_Cust_BWidth, info_gen_4g_huw.PCI||'/'|| int_avatar_bdi_4g.PCI as PCI_conf_vs_ref,
CASE WHEN info_gen_4g_huw.PCI = int_avatar_bdi_4g.PCI THEN 'OK'
     ELSE 'NOK'
    END as Check_PCI_conf_vs_ref,
info_gen_4g_huw.RSI||'/'||int_avatar_bdi_4g.RRS as RSS_conf_vs_ref ,
CASE WHEN info_gen_4g_huw.RSI = int_avatar_bdi_4g.RRS THEN 'OK'
     ELSE 'NOK'
    END as Check_RSS_conf_vs_ref, info_gen_4g_huw.Cell_Radius,
    
CASE WHEN  info_gen_4g_huw.TAC is null and optim_taclac.tac is not null then 'NA/'||optim_taclac.tac
     WHEN  info_gen_4g_huw.TAC is not null and optim_taclac.tac is null then info_gen_4g_huw.TAC||'/NA'
     ELSE info_gen_4g_huw.TAC|| '/'  || optim_taclac.tac  
     end as tac_conf_vs_ref, 
CASE WHEN info_gen_4g_huw.TAC is null or optim_taclac.tac is null then 'NA'
     WHEN info_gen_4g_huw.TAC = optim_taclac.tac THEN 'OK'
     ELSE 'NOK'
    END as Check_tac_conf_vs_ref, info_gen_4g_huw.RSP, info_gen_4g_huw.PA, info_gen_4g_huw.PB, info_gen_4g_huw.CPRI_Compression, info_gen_4g_huw.Sector_Eqpt, info_gen_4g_huw.RRU_Name, info_gen_4g_huw.RRU_Type, info_gen_4g_huw.Conf_MIMO_RRU, info_gen_4g_huw.Position_Physique, info_gen_4g_huw.Position_Logique, info_gen_4g_huw.SFP_RRU, info_gen_4g_huw.SFP_BBP, info_gen_4g_huw.Conf_MIMO_Cellule, rr_int_cellule.configurationtxrx_ref AS Mimo_ref,
CASE when  rr_int_cellule.configurationtxrx_ref like '%'||info_gen_4g_huw.Conf_MIMO_Cellule||'%' THEN 'OK'
     ELSE 'NOK'
    END as Check_Conf_MIMO_vs_ref
   ,info_gen_4g_huw.Nbre_utilisateurs, info_gen_4g_huw.DSS, info_gen_4g_huw.Bande_name, info_gen_4g_huw.Cross_Feeder, info_gen_4g_huw.Band_dst, info_gen_4g_huw.SCC_Prio, 
   
Case WHEN info_gen_4g_huw.RRU_Type is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN info_gen_4g_huw.RRU_Type is not Null and Antenne_RET_elixir.Configuration_RF is null then info_gen_4g_huw.RRU_Type||'/NA'
     WHEN (info_gen_4g_huw.RRU_Type is Null or info_gen_4g_huw.RRU_Type = '')  and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else info_gen_4g_huw.RRU_Type||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN info_gen_4g_huw.RRU_Type is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA/'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||info_gen_4g_huw.RRU_Type||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref, 
   info_gen_4g_huw.pcc_freq,
   CASE WHEN info_gen_4g_huw.Puissance IS NULL THEN 'NA/'||rru_puissance_finale_4G.Valeur
     WHEN rru_puissance_finale_4G.Valeur IS NULL THEN info_gen_4g_huw.Puissance||'/NA'
     ELSE info_gen_4g_huw.Puissance ||'/'|| rru_puissance_finale_4G.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,
    CASE WHEN info_gen_4g_huw.Puissance IS NULL or rru_puissance_finale_4G.Valeur IS NULL THEN 'NA'
    WHEN LEFT(info_gen_4g_huw.Puissance, -1) LIKE rru_puissance_finale_4G.Valeur THEN 'OK'
    ELSE 'NOK'
    END AS Check_configuredMaxTxPower_Conf_vs_Ref
from ((((info_gen_4g_huw LEFT JOIN int_avatar_bdi_4g 
ON info_gen_4g_huw.cellname = int_avatar_bdi_4g.cellname) LEFT JOIN  optim_taclac ON info_gen_4g_huw.sitename = optim_taclac.enodebname and optim_taclac.TAC_LIST like '%3G%') LEFT JOIN rr_int_cellule ON info_gen_4g_huw.cellname = rr_int_cellule.cellname)  LEFT JOIN rru_puissance_finale_4G ON rru_puissance_finale_4G.cellname = info_gen_4g_huw.cellname) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = info_gen_4g_huw.cellname """



query_info_gen_5G_huw = """SELECT DISTINCT info_gen_5g_huw.date_insertion, info_gen_5g_huw.Programme, info_gen_5g_huw.zone, info_gen_5g_huw.cell_id, info_gen_5g_huw.sitename,  info_gen_5g_huw.cellname, info_gen_5g_huw.Bande,

CASE WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Y' AND info_gen_5g_huw.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Q' AND info_gen_5g_huw.Bande LIKE '%3500%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno
,info_gen_5g_huw.Operateur,

CASE when info_gen_5g_huw.DL_NARFCN is null and int_avatar_bdi_5g.FrequenceDL  is not null then  'NA/'|| int_avatar_bdi_5g.FrequenceDL
     when info_gen_5g_huw.DL_NARFCN is not null and int_avatar_bdi_5g.FrequenceDL  is null then  info_gen_5g_huw.DL_NARFCN||'/NA'
     when info_gen_5g_huw.DL_NARFCN is  null and int_avatar_bdi_5g.FrequenceDL is null then 'NA/NA'
     else info_gen_5g_huw.DL_NARFCN || '/'|| int_avatar_bdi_5g.FrequenceDL 
     end as dl_narfcn_conf_vs_ref, 
CASE WHEN info_gen_5g_huw.DL_NARFCN is null or int_avatar_bdi_5g.FrequenceDL is null THEN 'NA'
     WHEN info_gen_5g_huw.DL_NARFCN = int_avatar_bdi_5g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as Check_dl_narfcn_conf_vs_ref,


CASE when info_gen_5g_huw.UL_NARFCN is null and int_avatar_bdi_5g.FrequenceUL  is not null then  'NA/'|| int_avatar_bdi_5g.FrequenceUL
     when info_gen_5g_huw.UL_NARFCN is not null and int_avatar_bdi_5g.FrequenceUL  is null then  info_gen_5g_huw.UL_NARFCN||'/NA'
     when info_gen_5g_huw.UL_NARFCN is  null and int_avatar_bdi_5g.FrequenceUL is null then 'NA/NA'
     else info_gen_5g_huw.UL_NARFCN || '/'|| int_avatar_bdi_5g.FrequenceUL 
     end as ul_narfcn_conf_vs_ref, 
CASE WHEN info_gen_5g_huw.UL_NARFCN is null or int_avatar_bdi_5g.FrequenceUL is null THEN 'NA'
     WHEN info_gen_5g_huw.UL_NARFCN = int_avatar_bdi_5g.FrequenceUL THEN 'OK'
     ELSE 'NOK'
    END as Check_ul_narfcn_conf_vs_ref,



CASE when info_gen_5g_huw.DL_BWidth is null and int_avatar_bdi_5g.LargeurBandeDL  is not null then  'NA/'|| int_avatar_bdi_5g.LargeurBandeDL
     when info_gen_5g_huw.DL_BWidth is not null and int_avatar_bdi_5g.LargeurBandeDL  is null then  info_gen_5g_huw.DL_BWidth||'/NA'
     when info_gen_5g_huw.DL_BWidth is  null and int_avatar_bdi_5g.LargeurBandeDL is null then 'NA/NA'
     else info_gen_5g_huw.DL_BWidth || '/'|| int_avatar_bdi_5g.LargeurBandeDL 
     end as DL_BWidth_conf_vs_ref, 
CASE WHEN info_gen_5g_huw.DL_BWidth is null or int_avatar_bdi_5g.LargeurBandeDL is null THEN 'NA'
     WHEN info_gen_5g_huw.DL_BWidth = int_avatar_bdi_5g.LargeurBandeDL THEN 'OK'
     ELSE 'NOK'
    END as Check_DL_BWidth_conf_vs_ref,


CASE when info_gen_5g_huw.UL_BWidth is null and int_avatar_bdi_5g.LargeurBandeUL  is not null then  'NA/'|| int_avatar_bdi_5g.LargeurBandeUL
     when info_gen_5g_huw.UL_BWidth is not null and int_avatar_bdi_5g.LargeurBandeUL  is null then  info_gen_5g_huw.UL_BWidth||'/NA'
     when info_gen_5g_huw.UL_BWidth is  null and int_avatar_bdi_5g.LargeurBandeUL is null then 'NA/NA'
     else info_gen_5g_huw.UL_BWidth || '/'|| int_avatar_bdi_5g.LargeurBandeUL 
     end as UL_BWidth_conf_vs_ref, 
CASE WHEN info_gen_5g_huw.UL_BWidth is null or int_avatar_bdi_5g.LargeurBandeUL is null THEN 'NA'
     WHEN info_gen_5g_huw.UL_BWidth = int_avatar_bdi_5g.LargeurBandeUL THEN 'OK'
     ELSE 'NOK'
    END as Check_UL_BWidth_conf_vs_ref,

info_gen_5g_huw.PCI ||'/'|| int_avatar_bdi_5g.nrpci as PCI_conf_vs_ref,
CASE WHEN  info_gen_5g_huw.PCI = int_avatar_bdi_5g.nrpci THEN 'OK'
     ELSE 'NOK'
    END as Check_PCI_conf_vs_ref,

info_gen_5g_huw.RSI||'/'||int_avatar_bdi_5g.RRS as RSS_conf_vs_ref ,
CASE WHEN info_gen_5g_huw.RSI = int_avatar_bdi_5g.RRS THEN 'OK'
     ELSE 'NOK'
    END as Check_RSS_conf_vs_ref,
    
CASE WHEN info_gen_5g_huw.TAC  is null then 'NA/1'
     ELSE info_gen_5g_huw.TAC||'/1'
    END as tac_conf_vs_ref,
CASE WHEN info_gen_5g_huw.TAC is null then 'NA'
     WHEN info_gen_5g_huw.TAC = '1' THEN 'OK'
     ELSE 'NOK'
    END as Check_tac_conf_vs_ref,
     info_gen_5g_huw.SubCarrier_Spacings, info_gen_5g_huw.SSB_Freq, 
     
     CASE WHEN info_gen_5g_huw.Power_par_Tx IS NULL THEN 'NA/'||rru_puissance_finale.Valeur
     WHEN rru_puissance_finale.Valeur IS NULL THEN info_gen_5g_huw.Power_par_Tx||'/NA'
     ELSE info_gen_5g_huw.Power_par_Tx ||'/'|| rru_puissance_finale.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,

CASE WHEN info_gen_5g_huw.Power_par_Tx IS NULL or rru_puissance_finale.Valeur IS NULL THEN 'NA'
    WHEN info_gen_5g_huw.Power_par_Tx LIKE rru_puissance_finale.Valeur||'000' THEN 'OK'
    ELSE 'NOK'
    END AS Check_configuredMaxTxPower_Conf_vs_Ref,
     
     info_gen_5g_huw.CPRI_Compression,
      info_gen_5g_huw.Sector_Eqpt, info_gen_5g_huw.RRU_Name, info_gen_5g_huw.RRU_Type, info_gen_5g_huw.Conf_MIMO_RRU, info_gen_5g_huw.Position_Physique, info_gen_5g_huw.Position_Logique, info_gen_5g_huw.SFP_RRU, info_gen_5g_huw.SFP_BBP, info_gen_5g_huw.Conf_MIMO_Cellule, rr_int_cellule.configurationtxrx_ref AS Mimo_ref,
CASE when  rr_int_cellule.configurationtxrx_ref like '%'||info_gen_5g_huw.Conf_MIMO_Cellule||'%' THEN 'OK'
     ELSE 'NOK'
    END as Check_Conf_MIMO_vs_ref, 
    Case WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Y' and info_gen_5g_huw.RRU_Type is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Q' and info_gen_5g_huw.RRU_Type is Null and Antenne_RET_elixir.Configuration is not null then 'NA/'||Antenne_RET_elixir.Configuration
     WHEN  LEFT(info_gen_5g_huw.cellname, 1) = 'Y' and info_gen_5g_huw.RRU_Type is not Null and Antenne_RET_elixir.Configuration_RF is null then info_gen_5g_huw.RRU_Type||'/NA'
     WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Y' and (info_gen_5g_huw.RRU_Type is Null or info_gen_5g_huw.RRU_Type = '')  and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     WHEN  LEFT(info_gen_5g_huw.cellname, 1) = 'Q' and info_gen_5g_huw.RRU_Type is not Null and Antenne_RET_elixir.Configuration is null then info_gen_5g_huw.RRU_Type||'/NA'
     WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Q' and (info_gen_5g_huw.RRU_Type is Null or info_gen_5g_huw.RRU_Type = '')  and Antenne_RET_elixir.Configuration is null then 'NA/NA'
     when  LEFT(info_gen_5g_huw.cellname, 1) = 'Q' and info_gen_5g_huw.RRU_Type is not Null and  Antenne_RET_elixir.Configuration is not null  then info_gen_5g_huw.RRU_Type||'/'||Antenne_RET_elixir.Configuration
     when  LEFT(info_gen_5g_huw.cellname, 1) = 'Y' and info_gen_5g_huw.RRU_Type is not Null and  Antenne_RET_elixir.Configuration_RF is not null  then info_gen_5g_huw.RRU_Type||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Y' and info_gen_5g_huw.RRU_Type is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA'
     WHEN LEFT(info_gen_5g_huw.cellname, 1) = 'Q' and info_gen_5g_huw.RRU_Type is Null or Antenne_RET_elixir.Configuration is null  then 'NA'
     WHEN  LEFT(info_gen_5g_huw.cellname, 1) = 'Y' and Antenne_RET_elixir.Configuration_RF LIKE '%'||info_gen_5g_huw.RRU_Type||'%' THEN 'OK'
     WHEN  LEFT(info_gen_5g_huw.cellname, 1) = 'Q' and Antenne_RET_elixir.Configuration LIKE '%'||info_gen_5g_huw.RRU_Type||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref
from ((((info_gen_5g_huw LEFT JOIN int_avatar_bdi_5g 
ON info_gen_5g_huw.cellname = int_avatar_bdi_5g.CellName) LEFT JOIN  optim_taclac ON info_gen_5g_huw.sitename = optim_taclac.enodebname and optim_taclac.TAC_LIST like '%3G%') LEFT JOIN rr_int_cellule ON info_gen_5g_huw.cellname = rr_int_cellule.cellname) LEFT JOIN rru_puissance_finale ON rru_puissance_finale.cellname = info_gen_5g_huw.cellname)
 LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = info_gen_5g_huw.cellname"""


query_info_gen_2G_huw = """ 


SELECT DISTINCT  info_gen_2g_huw.date_insertion, info_gen_2g_huw.Programme, info_gen_2g_huw.zone, info_gen_2g_huw.cell_id, info_gen_2g_huw.sitename,  info_gen_2g_huw.cellname, info_gen_2g_huw.Bande,

CASE WHEN LEFT(info_gen_2g_huw.cellname, 1) = 'C' AND int_avatar_bdi_2g.BandeFreq LIKE '%900%' THEN 'OK'
     WHEN LEFT(info_gen_2g_huw.cellname, 1) = 'B' AND int_avatar_bdi_2g.BandeFreq LIKE '%1800%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno
,info_gen_2g_huw.Operateur,

   info_gen_2g_huw.BCCH, info_gen_2g_huw.Cell_CI, info_gen_2g_huw.LAC, info_gen_2g_huw.NCC, info_gen_2g_huw.BCC,
    CASE WHEN info_gen_2g_huw.Puissance IS NULL THEN 'NA/'||rru_puissance_finale_2G_huw.Valeur 
     WHEN rru_puissance_finale_2G_huw.Valeur IS NULL THEN info_gen_2g_huw.Puissance||'/NA'
     ELSE info_gen_2g_huw.Puissance||'/'||rru_puissance_finale_2G_huw.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,
CASE WHEN  info_gen_2g_huw.Puissance IS NULL or rru_puissance_finale_2G_huw.Valeur IS NULL THEN 'NA'
     WHEN info_gen_2g_huw.Puissance LIKE rru_puissance_finale_2G_huw.Valeur||'W' THEN 'OK'
     ELSE 'NOK'
     END AS Check_configuredMaxTxPower_Conf_vs_Ref,     
     info_gen_2g_huw.Cell_state,
info_gen_2g_huw.Sector_Eqpt, info_gen_2g_huw.RRU_Name, info_gen_2g_huw.RRU_Type, info_gen_2g_huw.Conf_MIMO_RRU, info_gen_2g_huw.Position_Physique, info_gen_2g_huw.Position_Logique, info_gen_2g_huw.SFP_RRU, info_gen_2g_huw.SFP_BBP, info_gen_2g_huw.Conf_MIMO_Cellule, rr_int_cellule.configurationtxrx_ref AS Mimo_ref,
CASE when  rr_int_cellule.configurationtxrx_ref like '%'||info_gen_2g_huw.Conf_MIMO_Cellule||'%' THEN 'OK'
     ELSE 'NOK'
    END as Check_Conf_MIMO_vs_ref,
    
    Case WHEN info_gen_2g_huw.RRU_Type is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN info_gen_2g_huw.RRU_Type is not Null and Antenne_RET_elixir.Configuration_RF is null then info_gen_2g_huw.RRU_Type||'/NA'
     WHEN (info_gen_2g_huw.RRU_Type is Null or info_gen_2g_huw.RRU_Type = '')  and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else info_gen_2g_huw.RRU_Type||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN info_gen_2g_huw.RRU_Type is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA/'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||info_gen_2g_huw.RRU_Type||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref

From (((info_gen_2g_huw LEFT JOIN int_avatar_bdi_2g ON info_gen_2g_huw.CellName = int_avatar_bdi_2g.cellname)  
LEFT JOIN rr_int_cellule ON info_gen_2g_huw.CellName= rr_int_cellule.cellname) LEFT JOIN rru_puissance_finale_2G_huw ON rru_puissance_finale_2G_huw.CellName =info_gen_2g_huw.CellName) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = info_gen_2g_huw.CellName

"""


query_info_gen_3G_huw = """

SELECT DISTINCT  info_gen_3g_huw.date_insertion, info_gen_3g_huw.Programme, info_gen_3g_huw.zone, info_gen_3g_huw.cell_id, info_gen_3g_huw.sitename,  info_gen_3g_huw.cellname, info_gen_3g_huw.Bande,

CASE WHEN LEFT(info_gen_3g_huw.cellname, 1) = 'U' AND info_gen_3g_huw.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(info_gen_3g_huw.cellname, 1) = 'V' AND info_gen_3g_huw.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(info_gen_3g_huw.cellname, 1) = 'W' AND info_gen_3g_huw.Bande LIKE '%2100%' THEN 'OK'
     WHEN LEFT(info_gen_3g_huw.cellname, 1) = 'G' AND info_gen_3g_huw.Bande LIKE '%900%' THEN 'OK'
     ELSE 'NOK'
     END AS Check_Cell_Techno
,info_gen_3g_huw.Operateur,

CASE when info_gen_3g_huw.DL_UARFCN is null and int_avatar_bdi_3g.FrequenceDL  is not null then  'NA/'|| int_avatar_bdi_3g.FrequenceDL
     when info_gen_3g_huw.DL_UARFCN is not null and int_avatar_bdi_3g.FrequenceDL  is null then  info_gen_3g_huw.DL_UARFCN||'/NA'
     when info_gen_3g_huw.DL_UARFCN is  null and int_avatar_bdi_3g.FrequenceDL is null then 'NA/NA'
     else info_gen_3g_huw.DL_UARFCN || '/'|| int_avatar_bdi_3g.FrequenceDL 
     end as dl_uarfcn_conf_vs_ref, 
CASE WHEN info_gen_3g_huw.DL_UARFCN is null or int_avatar_bdi_3g.FrequenceDL is null THEN 'NA'
     WHEN info_gen_3g_huw.DL_UARFCN = int_avatar_bdi_3g.FrequenceDL THEN 'OK'
     ELSE 'NOK'
    END as Check_dl_uarfcn_conf_vs_ref,


CASE when info_gen_3g_huw.UL_UARFCN is null and int_avatar_bdi_3g.FrequenceUL  is not null then  'NA/'|| int_avatar_bdi_3g.FrequenceUL
     when info_gen_3g_huw.UL_UARFCN is not null and int_avatar_bdi_3g.FrequenceUL  is null then  info_gen_3g_huw.UL_UARFCN||'/NA'
     when info_gen_3g_huw.UL_UARFCN is  null and int_avatar_bdi_3g.FrequenceUL is null then 'NA/NA'
     else info_gen_3g_huw.UL_UARFCN || '/'|| int_avatar_bdi_3g.FrequenceUL 
     end as ul_uarfcn_conf_vs_ref, 
CASE WHEN info_gen_3g_huw.UL_UARFCN is null or int_avatar_bdi_3g.FrequenceUL is null THEN 'NA'
     WHEN info_gen_3g_huw.UL_UARFCN = int_avatar_bdi_3g.FrequenceUL THEN 'OK'
     ELSE 'NOK'
    END as Check_ul_uarfcn_conf_vs_ref,
    info_gen_3g_huw.SC, info_gen_3g_huw.LAC,
    
    CASE WHEN info_gen_3g_huw.Puissance IS NULL THEN 'NA/'||rru_puissance_finale_3G_huw.Valeur 
     WHEN rru_puissance_finale_3G_huw.Valeur IS NULL THEN info_gen_3g_huw.Puissance||'/NA'
     ELSE info_gen_3g_huw.Puissance||'/'||rru_puissance_finale_3G_huw.Valeur 
     END AS configuredMaxTxPower_Conf_vs_Ref,
CASE WHEN  info_gen_3g_huw.Puissance IS NULL or rru_puissance_finale_3G_huw.Valeur IS NULL THEN 'NA'
     WHEN info_gen_3g_huw.Puissance LIKE rru_puissance_finale_3G_huw.Valeur||'W' THEN 'OK'
     ELSE 'NOK'
     END AS Check_configuredMaxTxPower_Conf_vs_Ref,     
     info_gen_3g_huw.Cell_state,
info_gen_3g_huw.Sector_Eqpt, info_gen_3g_huw.RRU_Name, info_gen_3g_huw.RRU_Type, info_gen_3g_huw.Conf_MIMO_RRU, info_gen_3g_huw.Position_Physique, info_gen_3g_huw.Position_Logique, info_gen_3g_huw.SFP_RRU, info_gen_3g_huw.SFP_BBP, info_gen_3g_huw.Conf_MIMO_Cellule, rr_int_cellule.configurationtxrx_ref AS Mimo_ref,
CASE when  rr_int_cellule.configurationtxrx_ref like '%'||info_gen_3g_huw.Conf_MIMO_Cellule||'%' THEN 'OK'
     ELSE 'NOK'
    END as Check_Conf_MIMO_vs_ref,
    
    Case WHEN info_gen_3g_huw.RRU_Type is Null and Antenne_RET_elixir.Configuration_RF is not null then 'NA/'||Antenne_RET_elixir.Configuration_RF
     WHEN info_gen_3g_huw.RRU_Type is not Null and Antenne_RET_elixir.Configuration_RF is null then info_gen_3g_huw.RRU_Type||'/NA'
     WHEN (info_gen_3g_huw.RRU_Type is Null or info_gen_3g_huw.RRU_Type = '')  and Antenne_RET_elixir.Configuration_RF is null then 'NA/NA'
     else info_gen_3g_huw.RRU_Type||'/'||Antenne_RET_elixir.Configuration_RF
     End AS RRU_conf_vs_ref,
     
Case WHEN info_gen_3g_huw.RRU_Type is Null or Antenne_RET_elixir.Configuration_RF is null  then 'NA/'
     WHEN   Antenne_RET_elixir.Configuration_RF LIKE '%'||info_gen_3g_huw.RRU_Type||'%' THEN 'OK'
     else 'NOK'
     End AS Check_RRU_conf_vs_ref

From ((((info_gen_3g_huw LEFT JOIN int_avatar_bdi_3g ON info_gen_3g_huw.CellName = int_avatar_bdi_3g.cellname) 
LEFT JOIN  bdr_utran_erc_nodeb ON info_gen_3g_huw.cellname = bdr_utran_erc_nodeb.nodeBLocalCellId and info_gen_3g_huw.SiteName = bdr_utran_erc_nodeb.NeName) 
LEFT JOIN rr_int_cellule ON info_gen_3g_huw.CellName= rr_int_cellule.cellname) LEFT JOIN rru_puissance_finale_3G_huw ON rru_puissance_finale_3G_huw.CellName =info_gen_3g_huw.CellName) LEFT JOIN  Antenne_RET_elixir ON Antenne_RET_elixir.Nom_Cellule = info_gen_3g_huw.CellName"""



#######################################################################################################################

soft_info = {
    'BB6641': '/1 R27K15',
    'BB6648': '/1 R27K15',
    'BB6630' : '/12 R87K13',
    'BB5216' : '/15 R30K1',
    'BB6630' : '/15 R30K1',
    'BB5212' : '/15 R30K1'


}




query_1 = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Matching_cell_techno' As Parametre_NOK
FROM Comp_Conf_avatar_5G
WHERE Check_Cell_Techno = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'bSChannelBwDL' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_bSChannelBwDL_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'bSChannelBwUL' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_bSChannelBwUL_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'arfcndl' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_arfcndl_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'arfcnul' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_arfcnul_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'CellRange' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_CellRange_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'nrPCI' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_nrPCI_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'RSS' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_RSS_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'DSS_2' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_DSS_2 = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'tac' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_tac_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'gNBId' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_gnbid_conf_vs_ref = 'NOK'
"""

query_2 = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Matching_cell_techno' As Parametre_NOK
FROM Comp_Conf_avatar_4G
WHERE Check_Cell_Techno = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'DLchbandwidth' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_DLchbandwidth_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'ULchbandwidth' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_ULchbandwidth_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'earfcndl' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_earfcndl_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'earfcnul' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_earfcnul_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'CellRange' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_CellRange_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'PCI' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_PCI_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'RSS' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_RSS_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'DSS_2' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_DSS_2 = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'tac' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_tac_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'eNBId' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_enbid_conf_vs_ref = 'NOK'
"""


query_3 = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'licence' As Parametre_NOK
FROM int_info_site
WHERE check_licence = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'administrativestate' As Parametre_NOK
FROM int_info_site
WHERE check_administrativestate = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'synchronisation NGS' As Parametre_NOK
FROM int_info_site 
WHERE check_synchronisation = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'alarm' As Parametre_NOK
FROM int_info_site 
WHERE check_alarm = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Missing_RET' As Parametre_NOK
FROM int_info_site 
WHERE check_Missing_RET = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'RET_BB_vs_Antenna_matching' As Parametre_NOK
FROM int_info_site 
WHERE check_RET_BB_vs_Antenna_matching = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'RET_Connectors' As Parametre_NOK
FROM int_info_site 
WHERE Check_RET_Connectors = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'userlabel' As Parametre_NOK
FROM int_info_site 
WHERE check_userlabel = 'NOK'

"""


query_4 = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Synchro_Time_Phase' As Parametre_NOK
FROM info_eran
WHERE Check_Synchro_Time_Phase = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'IPSEC_5G' As Parametre_NOK
FROM info_eran
WHERE Check_IPSEC_5G_Enabled_Disabled  = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'IPSEC_4G' As Parametre_NOK
FROM info_eran 
WHERE Check_IPSEC_4G_Enabled_Disabled = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Activation_Compteur' As Parametre_NOK
FROM info_eran 
WHERE Check_Activation_Compteur = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'DSS_Check_3' As Parametre_NOK
FROM info_eran
WHERE Check_DSS_Check_3 = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'SFP' As Parametre_NOK
FROM info_eran 
WHERE Check_SFP = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Inner_LTE_IP' As Parametre_NOK
FROM info_eran 
WHERE Check_Inner_LTE_IP_Conf_vs_Ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Inner_5G_IP' As Parametre_NOK
FROM info_eran 
WHERE Check_Inner_5G_IP_Conf_vs_Ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Rfport' As Parametre_NOK
FROM info_eran 
WHERE Check_Mapping_Rfport = 'NOK'

"""


query_5 = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'MIMO' As Parametre_NOK
FROM info_mimo_ho_perf
WHERE Check_Mimo_conf_vs_ref = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'qRxLevMin' As Parametre_NOK
FROM info_mimo_ho_perf
WHERE Check_qRxLevMin_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Performance' As Parametre_NOK
FROM info_mimo_ho_perf 
WHERE Check_Performance = 'NOK'

"""


query_6 = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'transmissionMode' As Parametre_NOK
FROM info_gen_4g
WHERE check_transmissionMode = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'crsGain' As Parametre_NOK
FROM info_gen_4g
WHERE Check_crsGain_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'pdschTypeBGain' As Parametre_NOK
FROM info_gen_4g 
WHERE Check_pdschTypeBGain_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'software' As Parametre_NOK
FROM info_gen_4g 
WHERE check_software = 'NOK'

"""


query_1_tdd = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Matching_cell_techno' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd
WHERE Check_Cell_Techno = 'NOK'
Union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'bSChannelBwDL' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_bSChannelBwDL_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'bSChannelBwUL' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_bSChannelBwUL_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'arfcndl' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_arfcndl_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'arfcnul' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_arfcnul_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'CellRange' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd
WHERE Check_CellRange_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'nrPCI' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_nrPCI_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'rachRootSequence' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_rachRootSequence_conf_vs_ref  = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'configuredMaxTxPower' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_configuredMaxTxPower_Conf_vs_Ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'nRTAC' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_nRTAC_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'gNBId' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_gnbid_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'noOfUsedTxAntennas' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_noOfUsedTxAntennas_Conf_vs_Ref = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'noOfUsedRxAntennas' As Parametre_NOK
FROM comp_conf_avatar_5g_tdd 
WHERE Check_noOfUsedRxAntennas_Conf_vs_Ref = 'NOK'
"""

query_3_tdd = """SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'software' As Parametre_NOK
FROM view_info_site_tdd 
WHERE Check_software = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'alarm' As Parametre_NOK
FROM view_info_site_tdd
WHERE check_alarm = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'SFP' As Parametre_NOK
FROM view_info_site_tdd 
WHERE Check_SFP = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Synchro_Time_Phase' As Parametre_NOK
FROM view_info_site_tdd 
WHERE Check_Synchro_Time_Phase = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'IPSEC_5G_Enabled_Disabled' As Parametre_NOK
FROM view_info_site_tdd
WHERE Check_IPSEC_5G_Enabled_Disabled = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'userlabel' As Parametre_NOK
FROM view_info_site_tdd 
WHERE check_userlabel = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'Activation_Compteur' As Parametre_NOK
FROM view_info_site_tdd 
WHERE Check_Activation_Compteur = 'NOK'
union
SELECT DISTINCT Programme, date_insertion,  SiteName, zone,  'VlanPort_ERAN_E5_5G' As Parametre_NOK
FROM view_info_site_tdd 
WHERE Check_VlanPort_ERAN_E5_5G = 'NOK'

"""



query_rru_huw = """SELECT DISTINCT info_gen_5g_huw.sitename, info_gen_5g_huw.cellname, info_gen_5g_huw.zone, info_gen_5g_huw.power_par_tx, 
info_gen_5g_huw.dl_bwidth , int_avatar_bdi_5g.Bande, rru_puissance.Valeur, rru_puissance.MIMO, info_gen_5g_huw.conf_mimo_cellule, rru_puissance.Bande

from (info_gen_5g_huw LEFT JOIN int_avatar_bdi_5g ON info_gen_5g_huw.cellname = int_avatar_bdi_5g.CellName)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU LIKE info_gen_5g_huw.rru_type
and 'NR'||rru_puissance.Bande LIKE int_avatar_bdi_5g.Bande
and rru_puissance.BandWidth like info_gen_5g_huw.dl_bwidth||'.0'
and rru_puissance.Techno = '5G'
and info_gen_5g_huw.zone = rru_puissance.Zone
"""



query_rru_2G = """SELECT DISTINCT int_info_2g.sitename, int_info_2g.cellname, int_info_2g.zone, int_info_2g.configuredmaxtxpower, 
 int_avatar_bdi_2g.BandeFreq, rru_puissance.Valeur

from (int_info_2g LEFT JOIN int_avatar_bdi_2g ON int_info_2g.cellname = int_avatar_bdi_2g.cellname)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU = int_info_2g.ProductName 
and rru_puissance.Bande = int_avatar_bdi_2g.BandeFreq
and rru_puissance.Techno = '2G'
and int_info_2g.zone = rru_puissance.Zone
and rru_puissance.MIMO = int_info_2g.Tx||'T'"""



query_rru_3G = """SELECT DISTINCT int_info_3g.sitename, int_info_3g.userlabel, int_info_3g.zone, int_info_3g.configuredmaxtxpower, 
 int_avatar_bdi_3g.Bande, rru_puissance.Valeur

from (int_info_3g LEFT JOIN int_avatar_bdi_3g ON int_info_3g.userlabel = int_avatar_bdi_3g.cellname)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU = int_info_3g.ProductName 
and 'UMTS'||rru_puissance.Bande = int_avatar_bdi_3g.Bande
and rru_puissance.Techno = '3G'
and int_info_3g.zone = rru_puissance.Zone
and rru_puissance.MIMO = int_info_3g.numOfTxAntennas||'T'"""



query_rru = """SELECT DISTINCT int_info_5g.sitename, int_info_5g.cellname, int_info_5g.zone, int_info_5g.configuredmaxtxpower, 
int_info_5g.bschannelbwdl , int_avatar_bdi_5g.Bande, rru_puissance.Valeur

from (int_info_5g LEFT JOIN int_avatar_bdi_5g ON int_info_5g.cellname = int_avatar_bdi_5g.CellName)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU = int_info_5g.ProductName 
and 'NR'||rru_puissance.Bande = int_avatar_bdi_5g.Bande
and rru_puissance.BandWidth like int_info_5g.bschannelbwdl||'.0'
and rru_puissance.Techno = '5G'
and int_info_5g.zone = rru_puissance.Zone
and rru_puissance.MIMO = int_info_5g.noOfUsedTxAntennas||'T'"""



query_rru_4G = """SELECT DISTINCT int_info_4g.sitename, int_info_4g.cellname, int_info_4g.zone, int_info_4g.configuredmaxtxpower, 
 int_avatar_bdi_4g.Bande, rru_puissance.Valeur

from (int_info_4g LEFT JOIN int_avatar_bdi_4g ON int_info_4g.cellname = int_avatar_bdi_4g.cellname)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU LIKE int_info_4g.ProductName 
and rru_puissance.Techno = '4G'
and int_info_4g.zone = rru_puissance.Zone
and substring(int_info_4g.dlchannelbandwidth from 1 for length(int_info_4g.dlchannelbandwidth)-3)||'.0' LIKE rru_puissance.BandWidth
and int_info_4g.zone = rru_puissance.Zone
and rru_puissance.MIMO LIKE int_info_4g.TX||'T'
"""


query_rru_4G_huw = """SELECT DISTINCT info_gen_4g_huw.sitename, info_gen_4g_huw.cellname, info_gen_4g_huw.zone, info_gen_4g_huw.Puissance, 
 int_avatar_bdi_4g.Bande, rru_puissance.Valeur, info_gen_4g_huw.Conf_MIMO_Cellule, rru_puissance.BandWidth, info_gen_4g_huw.DL_BWidth, rru_puissance.Bande

from (info_gen_4g_huw LEFT JOIN int_avatar_bdi_4g ON info_gen_4g_huw.cellname = int_avatar_bdi_4g.cellname)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU LIKE info_gen_4g_huw.rru_type 
and rru_puissance.Techno = '4G'
and info_gen_4g_huw.zone = rru_puissance.Zone
and substring(info_gen_4g_huw.DL_BWidth from 1 for length(info_gen_4g_huw.DL_BWidth)-1)||'.0' LIKE rru_puissance.BandWidth
and rru_puissance.MIMO = LEFT(info_gen_4g_huw.Conf_MIMO_Cellule,2)
"""


querry_huw_Antenne = """select Date_Insertion, Programme, sitename, zone, Port_Type, Port_Status, BaseBand, Type_Licence, Date_Expiration, VSWR, Modele_Antenne As Modele_antenne_Conf, Configuration As Modele_antenne_ref,

Case when Modele_Antenne is null or Configuration is null then 'NA'
     when Configuration like '%'||Modele_Antenne||'%' then 'OK'
     else 'NOK'
     END as Check_Antenne_Modele_Conf_vs_ref
from info_licence_finale"""



querry_ttd_site_new = """

SELECT date_ref, programme, date_insertion, sitename, zone, check_vlanport_eran_e5_5g , baseband , eutranfreqrelation , software , check_software , userlabel , check_userlabel , gnbid , check_alarm , List_alarm , synchro_time_phase , check_synchro_time_phase , ipsec_5g_enabled_disabled , check_ipsec_5g_enabled_disabled , sfp , check_sfp , activation_compteur , check_activation_compteur, sitetheorique, synchro_8275, 

CASE when synchro_8275 LIKE 'OUI' and check_synchro_time_phase like "OK" then "OK"
     else "NOK"
     END as Chech_Syncho

from view_info_site_tdd_new

"""

rru_puissance_finale_3G_huw = """
SELECT DISTINCT info_gen_3g_huw.sitename, info_gen_3g_huw.cellname, info_gen_3g_huw.zone, info_gen_3g_huw.puissance, 
 info_gen_3g_huw.Bande, rru_puissance.Valeur, info_gen_3g_huw.Conf_MIMO_Cellule , rru_puissance.Bande, rru_puissance.Zone, rru_puissance.MIMO

from (info_gen_3g_huw LEFT JOIN int_avatar_bdi_3g ON info_gen_3g_huw.cellname = int_avatar_bdi_3g.cellname)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU LIKE info_gen_3g_huw.rru_type 
and rru_puissance.Techno = '3G'
and rru_puissance.Bande LIKE info_gen_3g_huw.Bande
and rru_puissance.MIMO = LEFT(info_gen_3g_huw.Conf_MIMO_Cellule,2)

"""

rru_puissance_finale_2G_huw = """
SELECT DISTINCT info_gen_2g_huw.sitename, info_gen_2g_huw.cellname, info_gen_2g_huw.zone, info_gen_2g_huw.puissance, 
 int_avatar_bdi_2g.BandeFreq, rru_puissance.Valeur, info_gen_2g_huw.Conf_MIMO_Cellule , rru_puissance.Bande, rru_puissance.Zone, rru_puissance.MIMO

from (info_gen_2g_huw LEFT JOIN int_avatar_bdi_2g ON info_gen_2g_huw.cellname = int_avatar_bdi_2g.cellname)LEFT JOIN  rru_puissance ON 
rru_puissance.RRU LIKE info_gen_2g_huw.rru_type
and rru_puissance.Techno = '2G'
and rru_puissance.Bande LIKE int_avatar_bdi_2g.BandeFreq
and rru_puissance.MIMO = LEFT(info_gen_2g_huw.Conf_MIMO_Cellule,2)
"""