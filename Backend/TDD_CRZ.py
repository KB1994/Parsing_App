import pandas as pd
from pyspark.sql import SparkSession
from pyspark.conf import SparkConf
import pyspark
import os
import sys
import datetime
from zipfile import ZipFile

from .Commun import read_block, remove_equals, Extract_Data_Frame_4G, Extract_bloc_RET, extract_band_mimo_4G, extract_data_with_ret, Extract_Data_Frame_5G, find_cosite_file_path, info_licence, extract_cell_Site_Cosite, check_carte_3G, Missing_RET_Check, get_rules_file_path, parsing_data_for_csv_rules, check_MIMO_RET_RULES, get_elixir_file_path
from pyspark.sql.functions import concat,col, when, lit
from .Constants import  query_4G_5G, query_5G_4G, query_5G , query_4G, query_licence_alarm_ngs, query_mimo_handover_perf, query_info_eran, query_info_4G_gen, query_info_gen_4G_huw, query_1 , query_2, query_3, query_4, query_5, query_6, query_5G_TDD, query_1_tdd, query_3_tdd, query_site_tdd, querry_ttd_site_new




def spark_TDD_CRZ(file_in_directory_input, abs_file_path, date_creation, programme, rules_file_path, soft_info):
    #print(os.path.join(os.getcwd(), 'files/Conf_file/postgresql-42.2.12.jar'))
    spark = SparkSession.builder.appName("Python pyspark for postgresql").config("spark.jars", os.path.join(os.getcwd(), 'files/Conf_file/postgresql-42.2.12.jar')).master("local[4]").getOrCreate()
    
    Liste_ref_file = []
    
    zf = ZipFile(get_elixir_file_path("/opt/application/RESERVE/14_TFT/export_elixir_qoc/", 'Requete_QoC'))
   # zf.namelist()
    #print(zf.namelist())
    df_Export_Antenne_RET_elixir = pd.read_csv(zf.open(zf.namelist()[0]))
    df_Export_Antenne_RET_elixir.rename(columns = {"Nom Antenne": "Nom_Antenne"}, inplace = True)
    df_Export_Antenne_RET_elixir.Profondeur_ = df_Export_Antenne_RET_elixir.Profondeur_.astype(str)
    df_Export_Antenne_RET_elixir.Longueur_ = df_Export_Antenne_RET_elixir.Longueur_.astype(str)
    df_Export_Antenne_RET_elixir.Largeur_ = df_Export_Antenne_RET_elixir.Largeur_.astype(str)
    df_Export_Antenne_RET_elixir.Usage_RF = df_Export_Antenne_RET_elixir.Usage_RF.astype(str)
    df_Export_Antenne_RET_elixir.BS = df_Export_Antenne_RET_elixir.BS.astype(str)
    df_Export_Antenne_RET_elixir.Nom_Antenne = df_Export_Antenne_RET_elixir.Nom_Antenne.astype(str)
    df_Export_Antenne_RET_elixir.Contructeur = df_Export_Antenne_RET_elixir.Contructeur.astype(str)
    df_Export_Antenne_RET_elixir.Configuration_ = df_Export_Antenne_RET_elixir.Configuration_.astype(str)
    df_Export_Antenne_RET_elixir.Forme_ = df_Export_Antenne_RET_elixir.Forme_.astype(str)
    df_Export_Antenne_RET_elixir.Type = df_Export_Antenne_RET_elixir.Type.astype(str)
    df_Export_Antenne_RET_elixir.Nom_RF = df_Export_Antenne_RET_elixir.Nom_RF.astype(str)
    df_Export_Antenne_RET_elixir.Constructeur_RF = df_Export_Antenne_RET_elixir.Constructeur_RF.astype(str)
    df_Export_Antenne_RET_elixir.Configuration_RF = df_Export_Antenne_RET_elixir.Configuration_RF.astype(str)
    df_Export_Antenne_RET_elixir.Etat_RF = df_Export_Antenne_RET_elixir.Etat_RF.astype(str)
    df_Export_Antenne_RET_elixir_new = spark.createDataFrame(df_Export_Antenne_RET_elixir)
    df_Export_Antenne_RET_elixir_new = df_Export_Antenne_RET_elixir_new.withColumnRenamed("Cellname", "Nom_Cellule")
    df_Export_Antenne_RET_elixir_new = df_Export_Antenne_RET_elixir_new.withColumnRenamed("Profondeur_", "Profondeur")
    df_Export_Antenne_RET_elixir_new = df_Export_Antenne_RET_elixir_new.withColumnRenamed("Longueur_", "Longueur")
    df_Export_Antenne_RET_elixir_new = df_Export_Antenne_RET_elixir_new.withColumnRenamed("Largeur_", "Largeur")
    df_Export_Antenne_RET_elixir_new = df_Export_Antenne_RET_elixir_new.withColumnRenamed("Configuration_", "Configuration")
    df_Export_Antenne_RET_elixir_new.createOrReplaceTempView("Antenne_RET_elixir")
    
    df_avatar_5G = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_AVATAR_BDI_5G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_avatar_5G = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_5G'), header=True, sep=";", encoding="UTF8")
    
    df_rr_int_cellule = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","rr_int_cellule").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_drim_eqpt_serv =  spark.read.csv(get_rules_file_path(rules_file_path, 'INT_DRIM_EQPT_SERVICE'), header=True, sep=";", encoding="UTF8")
    df_rr_int_cellule = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_RR_INT_CELLULE'), header=True, sep=";", encoding="UTF8")
    #df_rr_int_cellule.show()
    df_Export_Antenne_RET = spark.read.csv(os.path.join(os.getcwd(), 'files/file_ref/Export_Antenne_RET_040122.csv'), header=True, sep=";", encoding="UTF8")
    #df_Export_Antenne_RET.show()
    df_bdr_bdp_gnodeb = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_BDP_GNodeB'), header=True, sep=";", encoding="UTF8")
    df_bdr_ngran_erc_nrsectorCarrier = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_NGRAN_Erc_NRSectorCarrier'), header=True, sep=";", encoding="UTF8")
    df_int_optim_enodebid = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_OPTIM_ENODEBID'), header=True, sep=";", encoding="UTF8")
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_5G'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_RR_INT_CELLULE'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_OPTIM_ENODEBID'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'BDR_NGRAN_Erc_NRSectorCarrier'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_DRIM_EQPT_SERVICE'))
    date_file = []
    for i in Liste_ref_file:
        date_file.append(datetime.datetime.strptime((i.split("_")[-2]),"%Y%m%d"))
    Date_Ref = max(date_file)
    
    
    
######################################## Data frame Creation ################################################################################
    
    df_5G_final = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","int_info_5g_tdd").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    
    df_info_site_tdd = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","int_info_site_tdd").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    #df_bdr_bdp_gnodeb.createOrReplaceTempView("bdr_bdp_gnodeb")
    df_int_optim_enodebid.createOrReplaceTempView("int_optim_enodebid")
    df_bdr_bdp_gnodeb.createOrReplaceTempView("bdr_bdp_gnodeb")
    df_avatar_5G.createOrReplaceTempView("int_avatar_bdi_5g")
    df_drim_eqpt_serv.createOrReplaceTempView("int_drim_eqpt_serv")
    df_drim_eqpt_serv = df_drim_eqpt_serv.withColumnRenamed("SYNCHRO_8275", "synchro")
    
    
            
    eNBId = {}
    gNBId = {}
    #print("file_in_directory_input : ", file_in_directory_input)
    for file in file_in_directory_input:
        text_file_path = os.path.join(abs_file_path, file)
        print("text_file_path : ", text_file_path)
        with open(text_file_path) as f:
            a_info_cell_sectors = read_block(f, '#3)InformationsCell/SectorCarrier:', '#4)InformationsSFP/TN:')
            remove_equals(a_info_cell_sectors)
            remove_equals(a_info_cell_sectors)
            f.seek(0)
            info_EUtranFreqRelation = read_block(f, '#6)InformationsVoisinage:', '#7)InformationsAlarmes:')
            remove_equals(info_EUtranFreqRelation)
            remove_equals(info_EUtranFreqRelation)
            f.seek(0)
            bloc_gnid = read_block(f, '#1)InformationsSite/Cosite:', '#2)InformationsSynchro:')
            f.seek(0)
            #a_info_licence = read_block(f, '#Informationslicence:', '#InformationsERAN/BB/RILINK:')
            #remove_equals(a_info_cell_sectors)
            #remove_equals(a_info_cell_sectors)
            #f.seek(0)
            #print(a_info_cell_sectors)
            b_info_ERAN_E5_5G = read_block(
                f, 'MOadmOperatingModeadministrativeStateencapsulationoperOperatingModeoperationalStatereservedBy', 'Total:')
            f.seek(0)
            info_EUtranFreqRelation_new = []
            for el in info_EUtranFreqRelation_new :
                if el.startswith("NRCellCU") and 'NRFreqRelation' in el :
                    if el.split()[0].split(",")[1].split("=")[1] =='640320' and el.split()[0].split(",")[2].split("=")[1].startswith('Q'):
                        pass
                    elif el.split()[0].split(",")[1].split("=")[1] == '426990' and el.split()[0].split(",")[2].split("=")[1].startswith('Y'):
                        pass
                    else:
                        info_EUtranFreqRelation_new.append(" vs ".join(el.split()[0].split(",")[0:3]))
            info_EUtranFreqRelation_global = '/'.join(info_EUtranFreqRelation_new)
    
            
            list_5G = []
            
            
            for i in a_info_cell_sectors:
                
                if i.startswith('Y') or i.startswith('Q') or i == 'Pas de cellules 5G':
                    list_5G.append(i)
            if(len(bloc_gnid) !=0):
                for k in bloc_gnid:
                    if ('gNBId' in k):
                        gNBId[file.split("_")[2].split(".")[0].strip()] = k.split(":")[1].strip()
            else:
                gNBId[file.split("_")[2].split(".")[0].strip()] = ''
            list_data_frame_5G = []
            BaseBand_bloc = read_block(f, 'MOproductNameproductNumberproductRevisionproductionDateserialNumber', 'Total:')
            remove_equals(BaseBand_bloc)
            remove_equals(BaseBand_bloc)
            f.seek(0)
            
            
            if(len(BaseBand_bloc) != 0):
                    base_bande_value = BaseBand_bloc[0].split()[2]
            else:
                    base_bande_value = 'NA'
                    
                    
            RRU_bloc = read_block(f, 'FRU;LNH;BOARD;RF;BP;TX(W/dBm);VSWR(RL);RX(dBm);UEs/gUEs;Sector/AntennaGroup/Cells(State:CellIds:PCIs)', '----------------------------------------')
            remove_equals(RRU_bloc)
            remove_equals(RRU_bloc)
            f.seek(0)
            
            print(RRU_bloc)
            list_rru_cell = []
            for el in RRU_bloc:
                dict_rru = {}
                dict_rru['cellname'] = el.split(";")[-1].split()[1].split('=')[1].strip()
                dict_rru['rru_cellule'] = el.split(";")[2].strip()
                list_rru_cell.append(dict_rru)
                
            df_rru = spark.createDataFrame(pd.DataFrame(list_rru_cell))
            df_rru.show()
                
            
            if(list_5G != []):
                list_data_frame_5G = Extract_Data_Frame_5G(list_5G, file, date_creation, programme, Date_Ref, "CRZ", gNBId, {}, base_bande_value)
                df_5G = spark.createDataFrame(pd.DataFrame(list_data_frame_5G))
                df_5G_final = df_5G.withColumnRenamed("Statut Cell", "Statut_Cell")
                df_5G_final = df_5G_final.withColumnRenamed("Statut SectorCarrier", "Statut_SectorCarrier")
                df_5G_final = df_5G_final.withColumnRenamed("Statut AAS", "Statut_AAS")
                df_5G_final.show()
                #df_5G_final
                #df_5G_final.createOrReplaceTempView("int_info_5g_tdd")
                df_5G_result_rru = df_5G_final.join(df_rru, ['cellname'], "left")
                df_5G_result_rru.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="int_info_5g_tdd", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
                df_5G_result_rru.createOrReplaceTempView("int_info_5g_tdd")
                #df_avatar_5G.show()
                df_bdr_ngran_erc_nrsectorCarrier.createOrReplaceTempView("bdr_ngran_erc_nrsectorCarrier")
                df_5G_result = spark.sql(query_5G_TDD)
                df_5G_result.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="comp_conf_avatar_5g_tdd", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
                df_5G_result.createOrReplaceTempView("comp_conf_avatar_5g_tdd")
                df_5G_result.show()
                
                
            else:
                pass
            dict_info_site_name = {}
            list_info_site = []
            #check_a_info_licence = info_licence(a_info_licence, '(ACTIVATED)', a_info_cell_sectors)
            dict_info_site_name["date_ref"] = Date_Ref
            dict_info_site_name["programme"] = programme
            dict_info_site_name["date_insertion"] = date_creation
            if(".txt" in file.split("_")[2]):
                dict_info_site_name["SiteName"] = file.split("_")[2].split(".")[0].strip()
            else:
                 dict_info_site_name["sitename"] = file.split("_")[2].strip()
            dict_info_site_name["zone"] = "CRZ"
            #f(len(check_a_info_licence) == 0): 
                #dict_info_site_name["licence"] = ""
                #dict_info_site_name["check_licence"] = "OK"
            #else:
                #dict_info_site_name["licence"] = "/".join(check_a_info_licence)
                #dict_info_site_name["check_licence"] = "NOK"
            if len(b_info_ERAN_E5_5G) != 0 :
                   for ligne in b_info_ERAN_E5_5G:
                        if('VlanPort=ERAN_E5_5G' in ligne):
                            if ('ENABLED' in ligne):
                                dict_info_site_name['check_vlanport_eran_e5_5g'] = 'OK'
                            else:
                                dict_info_site_name['check_vlanport_eran_e5_5g'] = 'NOK'
            else:
                dict_info_site_name['check_vlanport_eran_e5_5g'] = "NA"
            if ('check_vlanport_eran_e5_5g' not in dict_info_site_name.keys()):
                dict_info_site_name['check_vlanport_eran_e5_5g'] = "NA"
                
            
            
            if(len(BaseBand_bloc) != 0):
                    dict_info_site_name["baseband"] = BaseBand_bloc[0].split()[2]
            else:
                    dict_info_site_name["baseband"] = 'NA'
            dict_info_site_name["eutranfreqrelation"] = info_EUtranFreqRelation_global
            e_info_soft= read_block(f, 'IDRiLTypeResMO1-MO2BOARD1-BOARD2AlmIDsCells(States)Issue(Failedchecks)', 'FRU;LNH;BOARD;ST;FAULT;OPER;MAINT;STAT;PRODUCTNUMBER;REV;SERIAL;DATE;PMTEMP;TEMP;UPT;')
            remove_equals(e_info_soft)
            f.seek(0)
            
            for el in e_info_soft:
                if el.startswith('Node: RadioNode'):
                    for soft in soft_info.keys():
                        if soft_info[soft] in ''.join(el.split()) and 'BB' + dict_info_site_name["BaseBand"].strip() in soft.strip():
                            dict_info_site_name["software"] = el.split()[3]+ ' ' + el.split()[4]
                            dict_info_site_name["check_software"] = 'OK'
                            break
                        else:
                            dict_info_site_name["software"] = el.split()[3]+ ' ' +el.split()[4]
                            dict_info_site_name["check_software"] = 'NOK'
            if "software" not in dict_info_site_name.keys():
                dict_info_site_name["software"] = ' '
            if "check_software" not in dict_info_site_name.keys():
                dict_info_site_name["check_software"] = 'NOK'
            info_cosite = read_block(f, 'userDefinedState', 'vendorName')
            f.seek(0)
            #print(info_cosite)
            check_info_cosite = ""
            if( len (info_cosite) != 0 and len (info_cosite[0].split()) > 1):
                dict_info_site_name["userlabel"] = info_cosite[0].split()[1]
                dict_info_site_name["check_userlabel"] = 'OK'
            else:
                dict_info_site_name["userlabel"] = ' '
                dict_info_site_name["check_userlabel"] = 'NOK'
            for element in gNBId.keys():
                if element == dict_info_site_name["sitename"]:
                    dict_info_site_name["gnbid"] = gNBId[element]
                else : 
                    dict_info_site_name["gnbid"] = ''
            text_file_path_cosite = find_cosite_file_path(dict_info_site_name["userlabel"].split("_")[-1], abs_file_path, a_info_cell_sectors)
            

           
            Alarm_bloc = read_block(f, 'Date&Time(UTC)SSpecificProblemMO(Cause/AdditionalInfo)', '#8)')
            remove_equals(Alarm_bloc)
            remove_equals(Alarm_bloc)
            f.seek(0)
            #print(alarms_text_block)
            if len(Alarm_bloc) == 0:
                #print("check alarm : ", 'OK')
                dict_info_site_name["check_alarm"] = "OK"
                dict_info_site_name["list_alarm"] = " "
            else:
                dict_info_site_name["check_alarm"] = "NOK"
                dict_info_site_name["List_alarm"] = "  ".join(Alarm_bloc)
            synchro_enabled_bloc = read_block(f, '#Informationssynchro:', '#InformationsCell/SectorCarrier:')
            f.seek(0)
            synch_enabled =  []
            for el in synchro_enabled_bloc:
                if('ENABLED' in el.split(":")[1]):
                    pass
                else:
                    synch_enabled.append(el.split(":")[0]+ " :DISABLED ")
            if(len(synch_enabled) == 0):
                dict_info_site_name['synchro_time_phase'] = " " 
                dict_info_site_name['check_synchro_time_phase'] = "OK" 
            else:
                dict_info_site_name['synchro_time_phase'] = " | ".join(synch_enabled) 
                dict_info_site_name['check_synchro_time_phase'] = "OK"
            bloc_IPSEC = read_block(f, '#InformationsInner/IPSEC', '#InformationsAntennaUnitGroup/Secteur:')
            f.seek(0)
            List_IPSEC_4G = []
            List_IPSEC_5G = []
            for el in bloc_IPSEC :
                if("IpsecTunnel" in el and 'LTE' in el):
                    List_IPSEC_4G.append(el)
                if("IpsecTunnel" in el and '5G' in el):
                    List_IPSEC_5G.append(el)
            if('Pas de cellules 5G' not in ''.join(a_info_cell_sectors)):
                if('DISABLED' not in "".join(List_IPSEC_5G)):
                    dict_info_site_name['ipsec_5g_enabled_disabled'] = " " 
                    dict_info_site_name['check_ipsec_5g_enabled_disabled'] = "OK"
                else:
                    dict_info_site_name['ipsec_5g_enabled_disabled'] = " | ".join(List_IPSEC_5G)
                    dict_info_site_name['check_ipsec_5g_enabled_disabled'] = "NOK"
            else:
                dict_info_site_name['ipsec_5g_enabled_disabled'] = "Absence Cellule 5G" 
                dict_info_site_name['check_ipsec_5g_enabled_disabled'] = "NA"

            SFP_block = read_block(
                f, 'ID;LINK;RiL;VENDOR1;VENDORPROD1;REV1;SERIAL1;DATE1;ERICSSONPROD1;VENDOR2;VENDORPROD2;REV2;SERIAL2;DATE2;ERICSSONPROD2', '---------------')
            f.seek(0)
            remove_equals(SFP_block)
            remove_equals(SFP_block)
            #print("SFP_block : ", SFP_block)
            SFP_block_nok = []
            if len(SFP_block) == 0 :
                dict_info_site_name['sfp'] = 'Absence de Conf SPF'
                dict_info_site_name['check_sfp'] = 'NA'
            else :
                for el in SFP_block:
                    if len(el.split()) == 17 :
                        if(el.split()[8] == el.split()[15]):
                            pass
                        else :
                            SFP_block_nok.append(el.split()[8] +"/" + el.split()[15])
                    elif len(el.split()) == 18 :
                        if(el.split()[9] == el.split()[16]):
                            pass
                        else :
                            SFP_block_nok.append(el.split()[9] +"/"+ el.split()[16])
                if len(SFP_block_nok) == 0 :
                    dict_info_site_name['sfp'] = ''
                    dict_info_site_name['check_sfp'] = 'OK'
                else:
                    dict_info_site_name['sfp'] = '/'.join(SFP_block_nok)
                    dict_info_site_name['check_sfp'] = 'NOK'
            
            Activation_Compteur_block = read_block(
                f, 'ProxyJobReqStateCurrStateGranulnrRdrs/Evts', '#InformationsSDI:')
            f.seek(0)
            remove_equals(Activation_Compteur_block)
            remove_equals(Activation_Compteur_block)
            list_info1 = []
            list_info2 = []
            for el in Activation_Compteur_block:
                if el.startswith("/ericsson"):
                    list_info1.append(el)
                else:
                    list_info2.append(el)
            if(len(list_info2) != 0 and len(list_5G) >= 1 and 'Pas de cellules 5G' not in ''.join(a_info_cell_sectors)):
                if(len(list_info1) == 0):
                    dict_info_site_name['activation_compteur'] = "Absence XML"
                    dict_info_site_name['check_activation_compteur'] = "NOK"
                   
                else:
                    dict_info_site_name['activation_compteur'] = " "
                    dict_info_site_name['check_activation_compteur'] = "OK"
            else:
                if(len(list_info2) != 0 and 'Pas de cellules 5G' in ''.join(a_info_cell_sectors)):
                    if(len(list_info1) == 0):
                        dict_info_site_name['activation_compteur'] = "Absence XML"
                        dict_info_site_name['check_activation_compteur'] = "NOK"
                    else:
                        dict_info_site_name['activation_compteur'] = " "
                        dict_info_site_name['check_activation_compteur'] = "OK"
                else:
                    if(len(list_info2) == 0 and 'Pas de cellules 5G' not in ''.join(a_info_cell_sectors)):
                        dict_info_site_name['activation_compteur'] = "Cellule 5G existe/Absence Compteur 5G"
                        dict_info_site_name['check_activation_compteur'] = "NOK"
                    elif (len(list_info2) == 0 and 'Pas de cellules 5G' not in ''.join(a_info_cell_sectors)):
                        dict_info_site_name['activation_compteur'] = "Absence Cellule 5G/Compteur 5G existe"
                        dict_info_site_name['check_activation_compteur'] = "NOK"
                        
                    else:
                        dict_info_site_name['activation_compteur'] = " "
                        dict_info_site_name['check_activation_compteur'] = "OK"
            
            list_info_site.append(dict_info_site_name)
            df_info_site_tdd  = spark.createDataFrame(pd.DataFrame(list_info_site))
            df_info_site_tdd.createOrReplaceTempView("view_info_site_tdd")
            df_avatar_modif = spark.sql("select distinct int_avatar_bdi_5g.nename, int_avatar_bdi_5g.sitetheorique, int_drim_eqpt_serv.synchro_8275 from int_avatar_bdi_5g left join int_drim_eqpt_serv on int_avatar_bdi_5g.sitetheorique = int_drim_eqpt_serv.site_theo_eqpt")
            #df_eqpt_modif = spark.sql("select distinct site_theo_eqpt, synchro_8275 from int_drim_eqpt_serv")
            df_avatar_modif.show()
            df_info_site_tdd_finale = df_info_site_tdd.join(df_avatar_modif,df_info_site_tdd.sitename == df_avatar_modif.nename,"left")
            df_avatar_modif.createOrReplaceTempView("new_avatar_modif")
            df_info_site_tdd_finale = df_info_site_tdd_finale.drop("nename")
            
            #df_info_site_tdd_finale.withColumn("Chech_Syncho", when(col("synchro_8275") == "OUI" & col("check_synchro_time_phase"), "OK").otherwise("NOK"))
            df_info_site_tdd_finale.createOrReplaceTempView("view_info_site_tdd_new")
            df_info_site_tdd_finale_1 = spark.sql(querry_ttd_site_new)
            df_info_site_tdd_finale_1.show()
            df_info_site_tdd_finale_1.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="int_info_site_tdd", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
            df_table_sythese_tdd = spark.sql(query_1_tdd)
            df_table_sythese_tdd.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site_tdd", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
            df_table_sythese_tdd =  spark.sql(query_3_tdd)
            df_table_sythese_tdd.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site_tdd", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
            #df_info_site_tdd.show()
            
            
            
            

    spark.sparkContext.stop()