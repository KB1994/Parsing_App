query_1 = """SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'Matching_cell_techno' As Parametre_NOK
FROM Comp_Conf_avatar_5G
WHERE Check_Cell_Techno = 'NOK'
Union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'DLchbandwidth' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_DLchbandwidth_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'ULchbandwidth' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_ULchbandwidth_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'arfcndl' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_arfcndl_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'arfcnul' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_arfcnul_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'CellRange' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_CellRange_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'PCI' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_PCI_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'RSS' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_RSS_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'DSS_2' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_DSS_2 = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'tac' As Parametre_NOK
FROM Comp_Conf_avatar_5G 
WHERE Check_tac_conf_vs_ref = 'NOK'
"""

query_2 = """SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'Matching_cell_techno' As Parametre_NOK
FROM Comp_Conf_avatar_4G
WHERE Check_Cell_Techno = 'NOK'
Union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'DLchbandwidth' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_DLchbandwidth_conf_vs_ref = 'NOK' 
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'ULchbandwidth' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_ULchbandwidth_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'arfcndl' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_arfcndl_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'arfcnul' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_arfcnul_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'CellRange' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_CellRange_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'PCI' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_PCI_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'RSS' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_RSS_conf_vs_ref = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'DSS_2' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_DSS_2 = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'tac' As Parametre_NOK
FROM Comp_Conf_avatar_4G 
WHERE Check_tac_conf_vs_ref = 'NOK'
"""


query_3 = """SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'licence' As Parametre_NOK
FROM int_info_site
WHERE check_licence = 'NOK'
Union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'administrativestate' As Parametre_NOK
FROM int_info_site
WHERE check_administrativestate = 'NOK' 
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'synchronisation NGS' As Parametre_NOK
FROM int_info_site 
WHERE check_synchronisation = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'alarm' As Parametre_NOK
FROM int_info_site 
WHERE check_alarm = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'Missing_RET' As Parametre_NOK
FROM int_info_site 
WHERE check_Missing_RET = 'NOK'

"""


query_4 = """SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'Synchro time' As Parametre_NOK
FROM info_eran
WHERE Check_Synchro_Enabled_Disabled = 'NOK'
Union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'IPSEC_5G' As Parametre_NOK
FROM info_eran
WHERE Check_IPSEC_5G_Enabled_Disabled  = 'NOK' 
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'IPSEC_4G' As Parametre_NOK
FROM info_eran 
WHERE Check_IPSEC_4G_Enabled_Disabled = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'Activation_Compteur' As Parametre_NOK
FROM info_eran 
WHERE Check_Activation_Compteur = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'DSS_Check_3' As Parametre_NOK
FROM info_eran
WHERE Check_DSS_Check_3 = 'NOK'

SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'SFP' As Parametre_NOK
FROM info_eran 
WHERE Check_SFP = 'NOK'

"""


query_5 = """SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'MIMO' As Parametre_NOK
FROM info_mimo_ho_perf
WHERE Check_Mimo_conf_vs_ref = 'NOK'
Union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'qRxLevMin' As Parametre_NOK
FROM info_mimo_ho_perf
WHERE Check_qRxLevMin = 'NOK' 
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'Performance' As Parametre_NOK
FROM info_mimo_ho_perf 
WHERE Check_Performance = 'NOK'

"""


query_6 = """SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'transmissionMode' As Parametre_NOK
FROM info_gen_4g
WHERE check_transmissionMode = 'NOK'
Union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'crsGain' As Parametre_NOK
FROM info_gen_4g
WHERE Check_crsGain = 'NOK' 
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'pdschTypeBGain' As Parametre_NOK
FROM info_gen_4g 
WHERE Check_pdschTypeBGain = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'software' As Parametre_NOK
FROM info_gen_4g 
WHERE check_software = 'NOK'
union
SELECT DISTINCT Programme, Date_Insertion,  SiteName, 'enbid' As Parametre_NOK
FROM info_gen_4g 
WHERE Check_enbid_conf_vs_ref = 'NOK'

"""