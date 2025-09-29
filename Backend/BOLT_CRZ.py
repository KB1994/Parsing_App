import pandas as pd
from pyspark.sql import SparkSession
from pyspark.conf import SparkConf
import pyspark
import os
import sys
import datetime
from zipfile import ZipFile
from .Commun import read_block, remove_equals, Extract_Data_Frame_4G, Extract_bloc_RET, extract_band_mimo_4G, extract_data_with_ret, Extract_Data_Frame_5G, find_cosite_file_path, info_licence, extract_cell_Site_Cosite, check_carte_3G, Missing_RET_Check, get_rules_file_path, parsing_data_for_csv_rules, check_MIMO_RET_RULES, Extract_Data_Frame_2G, Extract_Data_Frame_3G, check_auportref_rfportref, extract_rfbranch_rfport, get_elixir_file_path, insert_product
from pyspark.sql.functions import lit
from pyspark.sql.types import StructType,StructField, StringType
 

from .Constants import  query_4G_5G, query_5G_4G, query_5G , query_4G, query_licence_alarm_ngs, query_mimo_handover_perf, query_info_eran, query_info_4G_gen, query_info_gen_4G_huw, query_1 , query_2, query_3, query_4, query_5, query_6, query_2G , query_3G, query_DSS, query_rru, query_rru_2G, query_rru_3G, query_rru_4G



def spark_BOLT_CRZ(file_in_directory_input, abs_file_path, date_creation, programme, rules_file_path, soft_info):
    #print(os.path.join(os.getcwd(), 'files/Conf_file/postgresql-42.2.12.jar'))
    spark = SparkSession.builder.appName("Python pyspark for postgresql").config("spark.jars", os.path.join(os.getcwd(), 'files/Conf_file/postgresql-42.2.12.jar')).config('spark.driver.memory', '6g').config('spark.executor.memory','6g').getOrCreate()
    
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
    #df_Export_Antenne_RET_elixir_new.show()
    #print(df_Export_Antenne_RET_elixir)
    df_avatar_4G = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_AVATAR_BDI_4G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_avatar_4G = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_4G'), header=True, sep=";", encoding="UTF8")

    df_BDR_Erc_EutranCellFDD = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_EUTRAN_Erc_EutranCellFDD'), header=True, sep=";", encoding="UTF8")
    
    df_avatar_5G = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_AVATAR_BDI_5G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_avatar_5G = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_5G'), header=True, sep=";", encoding="UTF8")
    df_Optim_TACLAC = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","Optim_TACLAC").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_Optim_TACLAC = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_OPTIM_TACLAC'), header=True, sep=";", encoding="UTF8")
    #df_Optim_TACLAC.show()
    df_rr_int_cellule = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","rr_int_cellule").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_rr_int_cellule = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_RR_INT_CELLULE'), header=True, sep=";", encoding="UTF8")
    df_avatar_2G = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_2G'), header=True, sep=";", encoding="UTF8")
    df_avatar_3G = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_3G'), header=True, sep=";", encoding="UTF8")
    df_bdr_utran_erc_nodeb = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_UTRAN_Erc_NodeBSectorCarrier'), header=True, sep=";", encoding="UTF8")
    df_bdr_geran_erc_trx = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_GERAN_Erc_Trx'), header=True, sep=";", encoding="UTF8")
    df_bdr_eutran_erc_sectorCarrier = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_EUTRAN_Erc_SectorCarrier'), header=True, sep=";", encoding="UTF8")
    df_bdr_ngran_erc_nrsectorCarrier = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_NGRAN_Erc_NRSectorCarrier'), header=True, sep=";", encoding="UTF8")
    df_int_drim_interfaces_ip = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_DRIM_INTERFACES_IP'), header=True, sep=";", encoding="UTF8")
    df_int_rr_int_ald = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_RR_INT_ALD'), header=True, sep=";", encoding="UTF8")
    df_MainView = spark.read.csv(get_rules_file_path(rules_file_path, 'MainView'), header=True, sep=";", encoding="UTF8")
    #df_rr_int_cellule.show()
    df_Export_Antenne_RET = spark.read.csv(os.path.join(os.getcwd(), 'files/file_ref/Export_Antenne_RET_040122.csv'), header=True, sep=";", encoding="UTF8")
    #df_Export_Antenne_RET.show()
    #df_Export_Antenne_RET_elixir = pd.read_excel("/opt/application/RESERVE/14_TFT/export_elixir_qoc/Requete_QoC_Tarek_41_6775481267087365322.xlsx",sheet_name="Rapport 2")
    #df_Export_Antenne_RET_elixir = spark.createDataFrame(df_Export_Antenne_RET_elixir)

    #df_Export_Antenne_RET_elixir.show()
    #spark.read.csv(os.path.join(os.getcwd(), '/opt/application/qooc_tools/Requete_QoC_Tarek_41_6775481267087365322.xlsx'), header=True, sep=";", encoding="UTF8")
    df_rru_puissance = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","rru_puissance").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    #df_rru_puissance.show()
    df_bdr_bdp_gnodeb = spark.read.csv(get_rules_file_path(rules_file_path, 'BDR_BDP_GNodeB'), header=True, sep=";", encoding="UTF8")
    df_int_optim_enodebid = spark.read.csv(get_rules_file_path(rules_file_path, 'INT_OPTIM_ENODEBID'), header=True, sep=";", encoding="UTF8")
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_4G'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_5G'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_OPTIM_TACLAC'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_RR_INT_CELLULE'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_OPTIM_ENODEBID'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_2G'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_AVATAR_BDI_3G'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'BDR_UTRAN_Erc_NodeBSectorCarrier'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'BDR_GERAN_Erc_Trx'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'BDR_EUTRAN_Erc_SectorCarrier'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'BDR_NGRAN_Erc_NRSectorCarrier'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_DRIM_INTERFACES_IP'))
    Liste_ref_file.append(get_rules_file_path(rules_file_path, 'INT_RR_INT_ALD'))
    date_file = []
    for i in Liste_ref_file:
        date_file.append(datetime.datetime.strptime((i.split("_")[-2]),"%Y%m%d"))
    Date_Ref = max(date_file)
    
    
    
######################################## Data frame Creation ################################################################################
    
    df_5G_final = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_INFO_5G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_4G_final = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_INFO_4G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_3G_final = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_INFO_3G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_2G_final = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_INFO_2G").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_info_site = spark.read.format("jdbc").option("url","jdbc:postgresql://localhost:5432/qoc_django_db_new_db").option("dbtable","INT_INFO_Site").option("user","*").option("password","*").option("driver", "org.postgresql.Driver").load()
    df_rr_int_cellule.createOrReplaceTempView("rr_int_cellule")
    df_2G_final.createOrReplaceTempView("int_info_2g")
    df_bdr_geran_erc_trx.createOrReplaceTempView("bdr_geran_erc_trx")
    df_avatar_2G.createOrReplaceTempView("int_avatar_bdi_2g")
    df_avatar_3G.createOrReplaceTempView("int_avatar_bdi_3g")
    df_bdr_eutran_erc_sectorCarrier.createOrReplaceTempView("bdr_eutran_erc_sectorCarrier")
    df_bdr_ngran_erc_nrsectorCarrier.createOrReplaceTempView("bdr_ngran_erc_nrsectorCarrier")
    df_int_drim_interfaces_ip.createOrReplaceTempView("int_drim_interfaces_ip")
    df_bdr_utran_erc_nodeb.createOrReplaceTempView("bdr_utran_erc_nodeb")
    df_bdr_bdp_gnodeb.createOrReplaceTempView("bdr_bdp_gnodeb")
    df_int_optim_enodebid.createOrReplaceTempView("int_optim_enodebid")
    df_rru_puissance.createOrReplaceTempView("rru_puissance")
    df_MainView.createOrReplaceTempView("MainView")
    df_int_rr_int_ald.createOrReplaceTempView("int_rr_int_ald")
    #df_MainView.show()
    df_mainview_stat = spark.sql( "select MainView.NumPrj as site_theorique_E , MainView.NeName as NeName_E, MainView.Techno as techno_E from MainView where (MainView.Techno like '%2G%' or MainView.Techno like '%3G%' or MainView.Techno like '%4G%') and MainView.NeName like 'E%' ")
    #df_mainview_stat.show()
    df_mainview_stat_2 = spark.sql( "select MainView.NumPrj as site_theorique_X , MainView.NeName as NeName_X, MainView.Techno as techno_X from MainView where (MainView.Techno like '%2G%' or MainView.Techno like '%3G%' or MainView.Techno like '%4G%') and MainView.NeName like 'X%' ")
    #df_mainview_stat_2.show()
    
    
            
    eNBId = {}
    gNBId = {}
    for file in file_in_directory_input:
        text_file_path = os.path.join(abs_file_path, file)
        #print("text_file_path : ", text_file_path)
        with open(text_file_path) as f:
            a_info_cell_sectors = read_block(f, '#InformationsCell/SectorCarrier', '#InfoESS:')
            remove_equals(a_info_cell_sectors)
            remove_equals(a_info_cell_sectors)
            f.seek(0)
            info_EUtranFreqRelation = read_block(f, '#InformationsEUTRancellRelation:', '#InformationsKPI:')
            remove_equals(info_EUtranFreqRelation)
            remove_equals(info_EUtranFreqRelation)
            f.seek(0)
            a_info_licence = read_block(f, '#Informationslicence:', '#InformationsERAN/BB/RILINK:')
            remove_equals(a_info_cell_sectors)
            remove_equals(a_info_cell_sectors)
            f.seek(0)
            b_info_ERAN_BB_RILINK = read_block(
                f, '#InformationsERAN/BB/RILINK', '=================================================================================================================')
            f.seek(0)
            info_EUtranFreqRelation_new = []
            for el in info_EUtranFreqRelation:
                if el.startswith("EUtranCellFDD") and 'sCellCandidate' in el :
                    if el.split()[0].split(",")[1].split("=")[1] in ["227", "_251", "_103", "78"] and el.split()[0].split(",")[2].split("=")[1].startswith('P'):
                        pass
                    elif el.split()[0].split(",")[1].split("=")[1] == ['_6200', '_6300'] and el.split()[0].split(",")[2].split("=")[1].startswith('T'):
                        pass
                    elif el.split()[0].split(",")[1].split("=")[1] == ['_9385' , '_9235'] and el.split()[0].split(",")[2].split("=")[1].startswith('K'):
                        pass
                    elif el.split()[0].split(",")[1].split("=")[1] == ['_1850' , '_1501'] and el.split()[0].split(",")[2].split("=")[1].startswith('D'):
                        pass
                    elif el.split()[0].split(",")[1].split("=")[1] == ['_3175', '_2825'] and el.split()[0].split(",")[2].split("=")[1].startswith('L'):
                        pass
                    else:
                        info_EUtranFreqRelation_new.append(" vs ".join(el.split()[0].split(",")[0:3]))
            info_EUtranFreqRelation_global = '/'.join(info_EUtranFreqRelation_new)
            info_pmRadioTxRankDistr = read_block(f, 'ObjectCounter', 'Reportfrom')
            remove_equals(info_pmRadioTxRankDistr)
            remove_equals(info_pmRadioTxRankDistr)
            f.seek(0)
            info_pmRadioTxRankDistr_new = {}
            for el in info_pmRadioTxRankDistr:
                if( 'pmRadioTxRankDistr' in el ):
                    list_inter =  list(set(el.split()[-1].split(",")))
                    list_inter.remove('0')
                    info_pmRadioTxRankDistr_new[el.split()[0].split('=')[1]] = len(list_inter)
            list_2G = []
            list_3G = []
            list_4G = []
            list_5G = []
            a_info_cell_sectors.remove('#2G :')
            a_info_cell_sectors.remove('#4G :')
            a_info_cell_sectors.remove('#5G :')
            a_info_cell_sectors.remove('#3G :')
            cell_sector_5G = a_info_cell_sectors.copy()
            if ('Pas de cellules 2G' in a_info_cell_sectors):
                a_info_cell_sectors.remove('Pas de cellules 2G')
            if ('Pas de cellules 3G' in a_info_cell_sectors):
                a_info_cell_sectors.remove('Pas de cellules 3G')
            if ('Pas de cellules 4G' in a_info_cell_sectors):
                a_info_cell_sectors.remove('Pas de cellules 4G')
            if ('Pas de cellules 5G' in a_info_cell_sectors):
                a_info_cell_sectors.remove('Pas de cellules 5G')
            
            for li in a_info_cell_sectors:
                if li.startswith('Y') or li.startswith('Q') or li == 'Pas de cellules 5G':
                    list_5G.append(li)
                if li.startswith('C') or li.startswith('B') or li == 'Pas de cellules 2G':
                    list_2G.append(li)
                if li.startswith('S') or li == 'Pas de cellules 3G':
                    list_3G.append(li)
                if (li.startswith('P') and li not in ['Pas de cellules 2G', 'Pas de cellules 3G', 'Pas de cellules 5G', 'Pas de cellules 4G']) or (li.startswith('L') and i.startswith('Le secteur')==False) or li.startswith('K') or li.startswith('T') or li.startswith('F') or li.startswith('D') :
                    list_4G.append(li)
                if('eNBId' in li):
                    eNBId [file.split("_")[2].split(".")[0].strip()]= li.split(":")[1]
                if ('gNBId' in li):
                    gNBId[file.split("_")[2].split(".")[0].strip()] = li.split(":")[1]
            if('Pas de NextHop' in list_4G):
                list_4G.remove('Pas de NextHop')
            list_data_frame_5G = []
            list_data_frame_4G = []
            list_data_frame_2G = []
            list_data_frame_3G = []
            
            e_info_baseband_number = read_block(f, 'MOproductNameproductNumberproductRevisionproductionDateserialNumber', 'Total:')
            f.seek(0)
            remove_equals(e_info_baseband_number)
            if( len(e_info_baseband_number) != 0 and len(e_info_baseband_number[0].split()) > 1):
                base_bande_value = e_info_baseband_number[0].split()[2]
            else:
                base_bande_value = ' '
            band_Product =  read_block(f, 'MOadministrativeStateoperationalStateproductNameproductNumberproductRevisionproductionDateserialNumber', 'Total')
            f.seek(0)
            remove_equals(band_Product)
            remove_equals(band_Product)
            band_Product_dict =  {}
            band_Product_RF =  {}
            for bande_ligne in band_Product:
                if( "B8" in "".join(bande_ligne.split())):
                    band_Product_dict["900"] = bande_ligne.split()[6]
                    band_Product_RF["900"] = str(bande_ligne.split()[5]).upper() + str(bande_ligne.split()[6])
                if("B20" in "".join(bande_ligne.split())):
                    band_Product_dict["800"] = bande_ligne.split()[6]
                    band_Product_RF["800"] = str(bande_ligne.split()[5]).upper() + str(bande_ligne.split()[6])
                if("B28" in "".join(bande_ligne.split())):
                    band_Product_dict["700"] = bande_ligne.split()[6]
                    band_Product_RF["700"] = str(bande_ligne.split()[5]).upper() + str(bande_ligne.split()[6])
                if("B3" in "".join(bande_ligne.split())):
                    band_Product_dict["1800"] = bande_ligne.split()[6]
                    band_Product_RF["1800"] = str(bande_ligne.split()[5]).upper() + str(bande_ligne.split()[6])
                if("B7" in "".join(bande_ligne.split())):
                    band_Product_dict["2600"] = bande_ligne.split()[6]
                    band_Product_RF["2600"] = str(bande_ligne.split()[5]).upper() + str(bande_ligne.split()[6])
                if("B1" in "".join(bande_ligne.split())):
                    band_Product_dict["2100"] = bande_ligne.split()[6]
                    band_Product_RF["2100"] = str(bande_ligne.split()[5]).upper() + str(bande_ligne.split()[6])
                
                          
            #schema = StructType([ StructField('cellname', StringType(), True) , StructField('bande', StringType(), True)])
            #df_cell_tilt_initiale = spark.createDataFrame([], schema)
            list_cell_tilt = []
            print('after check band')
            if(list_5G != []):
                list_data_frame_5G = Extract_Data_Frame_5G(list_5G, file, date_creation, programme, Date_Ref, "CRZ", gNBId, band_Product_dict, base_bande_value)
                list_data_frame_5G = insert_product(list_data_frame_5G, band_Product_RF)
                df_5G = spark.createDataFrame(pd.DataFrame(list_data_frame_5G))
                df_5G_final = df_5G.withColumnRenamed("Statut Cell", "Statut_Cell")
                df_5G_final.show()
                df_5G_final.createOrReplaceTempView("int_info_5g")
                df_5G_final.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="int_info_5g", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
                df_avatar_5G.createOrReplaceTempView("int_avatar_bdi_5g")
                df_Optim_TACLAC.createOrReplaceTempView("optim_taclac")
                rru_result = spark.sql(query_rru)
                rru_result.createOrReplaceTempView("rru_puissance_finale")
                df_5G_table_finale = spark.sql(query_5G )
                df_5G_table_finale.createOrReplaceTempView("Comp_Conf_avatar_5G")
                list_cell_tilt.extend(df_5G_table_finale.select('cellname').rdd.flatMap(lambda x: x).collect())
                df_cell_tilt_5G = spark.sql("select cellname, bande from Comp_Conf_avatar_5G")
                #df_cell_tilt_initiale.union(df_cell_tilt_5G)
                #df_5G_table_finale.orderBy("date_insertion",ascending=False)
                
                df_5G_table_finale.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="Comp_Conf_avatar_5G", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
                df_table_sythese =  spark.sql(query_1)
                df_table_sythese.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
                
                #df_5G_table_finale.show()
                #df_5G_4G_Globale = spark.sql(query_5G_4G)
                #df_5G_4G_Globale.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="comp_conf_avatar_4g_5g", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
                
                print("5G done")
            else:
                pass
            if(list_4G != []):
                list_data_frame_4G = Extract_Data_Frame_4G(list_4G, file, info_pmRadioTxRankDistr_new , info_EUtranFreqRelation_new, date_creation, programme, Date_Ref, "CRZ", eNBId, band_Product_dict, base_bande_value)
                list_data_frame_4G = insert_product(list_data_frame_4G, band_Product_RF)
                df_4G = spark.createDataFrame(pd.DataFrame(list_data_frame_4G))
                df_4G_final = df_4G.withColumnRenamed("Statut Cell", "Statut_Cell")
                df_4G_final.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="int_info_4g", mode="append", properties={"user": "*", "password": "*", "driver" : "org.postgresql.Driver"})
                
                df_4G_final.createOrReplaceTempView("int_info_4g")
                
                df_avatar_4G.createOrReplaceTempView("int_avatar_bdi_4g")
                rru_4G_result = spark.sql(query_rru_4G)
                rru_4G_result.show()
                rru_4G_result.createOrReplaceTempView("rru_puissance_finale_4G")
                df_Optim_TACLAC.createOrReplaceTempView("optim_taclac")
                df_4G_table_finale = spark.sql(query_4G )
                list_cell_tilt.extend(df_4G_table_finale.select('cellname').rdd.flatMap(lambda x: x).collect())
                df_4G_table_finale.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="Comp_Conf_avatar_4G", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
                print("4G done")
                df_4G_table_finale.createOrReplaceTempView("Comp_Conf_avatar_4G")
                df_table_sythese =  spark.sql(query_2)
                df_cell_tilt_4G = spark.sql("select cellname, bande from Comp_Conf_avatar_4G")
                #df_cell_tilt_initiale.union(df_cell_tilt_4G)
                df_table_sythese.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
                #df_4G_5G_Globale = spark.sql(query_4G_5G)
                #df_4G_5G_Globale.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="comp_conf_avatar_4g_5g", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
                
                


            else:
                pass
            dict_info_site_name = {}
            list_info_site = []
            check_a_info_licence = info_licence(a_info_licence, '(ACTIVATED)', a_info_cell_sectors)
            dict_info_site_name["Date_Ref"] = Date_Ref
            dict_info_site_name["Programme"] = programme
            dict_info_site_name["date_insertion"] = date_creation
            if(".txt" in file.split("_")[2]):
                dict_info_site_name["SiteName"] = file.split("_")[2].split(".")[0].strip()
            else:
                 dict_info_site_name["SiteName"] = file.split("_")[2].strip()
            dict_info_site_name["zone"] = "CRZ"
            if(len(check_a_info_licence) == 0): 
                dict_info_site_name["licence"] = ""
                dict_info_site_name["check_licence"] = "OK"
            else:
                dict_info_site_name["licence"] = "/".join(check_a_info_licence)
                dict_info_site_name["check_licence"] = "NOK"
            if len(b_info_ERAN_BB_RILINK) != 0 and b_info_ERAN_BB_RILINK[1] == 'Le EranInterMeLink=1 : Existe' :
                dict_info_site_name["Interco"] = "Existe"
                #print(" Interco: ", "Existe")
            else:
                dict_info_site_name["Interco"] = "Absent"
            
            dict_info_site_name["BaseBand"] = base_bande_value
            dict_info_site_name["EUtranFreqRelation"] = info_EUtranFreqRelation_global
            #e_info_soft= read_block(f, 'AlmIDIDsRiLsStatusAlarm', 'FRU;LNH;BOARD;ST;FAULT;OPER;MAINT;STAT;PRODUCTNUMBER;REV;SERIAL;DATE;PMTEMP;TEMP;UPT;')
            e_info_soft= read_block(f, '#InformationsSDI:', 'FRU;LNH;BOARD;ST;FAULT;OPER;MAINT;STAT;PRODUCTNUMBER;REV;SERIAL;DATE;PMTEMP;TEMP;UPT;')
            remove_equals(e_info_soft)
            f.seek(0)
            print("soft equi : ", e_info_soft)
            
            for el in e_info_soft:
                if el.startswith('Node: RadioNode'):
                    print(el)
                    for soft in soft_info.keys():
                        if soft_info[soft] in ''.join(el.split()) and 'BB' + dict_info_site_name["BaseBand"].strip() in soft.strip():
                            dict_info_site_name["software"] = el.split()[3]+ ' ' + el.split()[4]+'_vs_'+soft_info[soft]
                            dict_info_site_name["Check_software"] = 'OK'
                            break
                        else:
                            dict_info_site_name["software"] = el.split()[3]+ ' ' +el.split()[4] +'_vs_'+soft_info[soft]
                            dict_info_site_name["Check_software"] = 'NOK'
            if "software" not in dict_info_site_name.keys():
                dict_info_site_name["software"] = ' '
            if "Check_software" not in dict_info_site_name.keys():
                dict_info_site_name["Check_software"] = 'NOK'
            info_cosite = read_block(f, 'userDefinedState', 'vendorName')
            f.seek(0)
            check_info_cosite = ""
            if( len (info_cosite) != 0 and len (info_cosite[0].split()) > 1):
                dict_info_site_name["userLabel"] = info_cosite[0].split()[1]
                dict_info_site_name["Check_userLabel"] = 'OK'
            else:
                dict_info_site_name["userLabel"] = ' '
                dict_info_site_name["Check_userLabel"] = 'NOK'
            for element in eNBId.keys():
                if element == dict_info_site_name["SiteName"]:
                    dict_info_site_name["eNBId"] = eNBId[element].strip()
                else : 
                    dict_info_site_name["eNBId"] = ''
            for element in gNBId.keys():
                if element == dict_info_site_name["SiteName"]:
                    dict_info_site_name["gNBId"] = gNBId[element]
                else : 
                    dict_info_site_name["gNBId"] = ''
            #print(dict_info_site_name["userLabel"])
            #print("file : ", file)
            #text_file_path_cosite = find_cosite_file_path(dict_info_site_name["userLabel"].split("_")[-1], abs_file_path, a_info_cell_sectors)
            text_file_path_cosite = find_cosite_file_path(file, abs_file_path, a_info_cell_sectors)
            #print("text_file_path_cosite : ", text_file_path_cosite)
            
            RET_Bloc , RET_Bloc_connector = Extract_bloc_RET(text_file_path_cosite['Cosite'], text_file_path_cosite['site'])
            RET_Bloc_nok = []
            
            for ret in RET_Bloc:
                list_inter = []
                list_inter = ret.split()[0].split(",")
                list_inter.extend(ret.split()[1:])
                #print("i m after all  : ")
                #print('ret list : ', list_inter)
                if(list_inter[-1].strip() == list_inter[1].split("=")[1].strip()):
                    pass
                else:
                    RET_Bloc_nok.append(list_inter[-1].strip() +" vs "+ list_inter[1].split("=")[1].strip())
          
            #print("RET_Bloc_nok : ", RET_Bloc_nok)
            #print("RET_Bloc_connector : ", RET_Bloc_connector)
            
            print(list_cell_tilt)
            list_cell_tilt_finale = []
            for el in list_cell_tilt:
                dict_inter = {}
                if el.startswith("C") or el.startswith("G"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '900'
                elif el.startswith("B") or el.startswith("D"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '1800'
                elif el.startswith("U") or el.startswith("Y") or el.startswith("V") or el.startswith("W") or el.startswith("P"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '2100'
                elif el.startswith("Q"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '3500'
                elif el.startswith("K"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '700'
                elif el.startswith("L"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '2600'
                elif el.startswith("T"):
                    dict_inter["cellname"] = el
                    dict_inter["bande"] = '800'
                list_cell_tilt_finale.append(dict_inter)
            df_cell_tilt_initiale = spark.createDataFrame(pd.DataFrame(list_cell_tilt_finale))
            df_cell_tilt_initiale.show()
            df_cell_tilt_initiale.createOrReplaceTempView("cell_tilt")
            df_cell_tilt_finale = spark.sql("select cell_tilt.cellname, cell_tilt.bande, int_rr_int_ald.TiltElec_PREV, int_rr_int_ald.TiltElec_REF  from cell_tilt left join int_rr_int_ald on cell_tilt.cellname = int_rr_int_ald.Cellname") 
            df_cell_tilt_finale.show()
            list_data_cell_4G = extract_cell_Site_Cosite(list_4G, text_file_path_cosite['Cosite'],list_data_frame_4G, date_creation, programme, Date_Ref, "CRZ" , band_Product_dict)
            list_band_mimo_4G = extract_band_mimo_4G(list_data_cell_4G)
            missing_info_ret = False
            dict_ret_state_finale = {}
            if(len(RET_Bloc) != 0 and len(RET_Bloc_connector) != 0):
                list_data_cell_4G, dict_ret_state, Ret_List_antenne, Ret_List  = extract_data_with_ret(RET_Bloc, RET_Bloc_connector, list_data_cell_4G)
                #print("dict_ret_state avant : ", dict_ret_state )
                carte_information_retrieve = read_block(f, "MOadministrativeStateoperationalStateproductNameproductNumberproductRevisionproductionDateserialNumber", "Total")
                remove_equals(carte_information_retrieve)
                remove_equals(carte_information_retrieve)
                f.seek(0)
                carte_3G, dict_band_carte, check_carte_type = check_carte_3G(carte_information_retrieve)
                list_carte = list(map(list, list(set(map(tuple, list(dict_band_carte.values()))))))
                if (len(list(set(Ret_List_antenne))) !=0 ):
                    selected_df_Export_Antenne_RET =df_Export_Antenne_RET.filter(df_Export_Antenne_RET.configuration.like("%"+list(set(Ret_List_antenne))[0]+"%"))
                    #selected_df_Export_Antenne_RET.show()
                    
                else:
                    print("im an empty data frame")
                dict_ret_state_finale = dict_ret_state
                for el in dict_ret_state.keys():
                    if dict_ret_state[el] == False:
                        if (el == '700' or el == '1800'):
                                pass
                        elif(el == '2100'):
                            if('1800' in dict_ret_state.keys() and dict_ret_state['1800'] == True):
                                dict_ret_state_finale.update({el: True})
                            else:
                                selected_df_Export_Antenne_RET_finale = selected_df_Export_Antenne_RET.filter(selected_df_Export_Antenne_RET.Bandfreq.like('%'+el+"%") )
                                selected_df_Export_Antenne_RET_finale.show()
                                df_bande = selected_df_Export_Antenne_RET_finale.select(selected_df_Export_Antenne_RET_finale["Bandfreq"]).collect()
                                band_list_connector = list(set(([row['Bandfreq'] for row in df_bande])))
                                if(selected_df_Export_Antenne_RET_finale.count() >= 2):
                                    base_bande_min = 0
                                    for j in list_carte:
                                        if el in j:
                                            base_bande_min = min(list(map(int,j)))
                                    if(dict_ret_state[str(base_bande_min)] == True):
                                        dict_ret_state_finale.update({el: True})
                                else:
                                    #print("list connector 2 : ", band_list_connector)
                                    #print("list connector 2 : ", len(band_list_connector) )
                                    if len(band_list_connector) != 0:
                                        base_bande_min = min(list(map(int,band_list_connector[0].split("/"))))
                                        if(dict_ret_state[str(base_bande_min)] == True):
                                            dict_ret_state_finale.update({el: True})
                        elif (el == '2600'):
                            if('1800' in dict_ret_state.keys()):
                                dict_ret_state_finale.update({el: True})
                            elif ('2100' in dict_ret_state.keys()):
                                dict_ret_state_finale.update({el: True})
                            else:
                                pass
                        elif(el == '800'):
                            if('700' in dict_ret_state.keys() and dict_ret_state['700'] == True):
                                dict_ret_state_finale.update({el: True})
                            else:
                                selected_df_Export_Antenne_RET_finale = selected_df_Export_Antenne_RET.filter(selected_df_Export_Antenne_RET.Bandfreq.like('%'+el+"%") & ~selected_df_Export_Antenne_RET.Bandfreq.like('%1800%'))
                            #selected_df_Export_Antenne_RET_finale.show()
                                df_bande = selected_df_Export_Antenne_RET_finale.select(selected_df_Export_Antenne_RET_finale["Bandfreq"]).collect()
                                band_list_connector = list(set(([row['Bandfreq'] for row in df_bande])))
                                if(selected_df_Export_Antenne_RET_finale.count() >= 2):
                                    base_bande_min = 0
                                    for j in list_carte:
                                        if el in j:
                                            base_bande_min = min(list(map(int,j)))
                                    if(dict_ret_state[str(base_bande_min)] == True):
                                        dict_ret_state_finale.update({el: True})
                                else:
                                    #print("list connector 3 : ", band_list_connector)
                                    if len(band_list_connector) != 0:
                                        base_bande_min = min(list(map(int,band_list_connector[0].split("/"))))
                                        if(dict_ret_state[str(base_bande_min)] == True):
                                            dict_ret_state_finale.update({el: True})

                        else:
                            selected_df_Export_Antenne_RET_finale = selected_df_Export_Antenne_RET.filter(selected_df_Export_Antenne_RET.Bandfreq.like('%'+el+"%"))
                            #selected_df_Export_Antenne_RET_finale.show()
                        #print("dict_ret_state apres : ", dict_ret_state )
                    else:
                        pass
            else:
                missing_info_ret = True
                pass
            
            print("dict_ret_state_finale : ", dict_ret_state_finale)
            list_cell_ret_tilt =[]
            
            for el in list_data_cell_4G:
                dict_inter = {}
                if 'RET_name' in el.keys():
                    dict_inter['cellname'] = el['cellname']
                    dict_inter['RET_name'] = el['RET_name']
                else:
                    dict_inter['cellname'] = el['cellname']
                    dict_inter['RET_name'] = ''
                list_cell_ret_tilt.append(dict_inter)
            df_ret_cell_tilt = spark.createDataFrame(pd.DataFrame(list_cell_ret_tilt))
            df_ret_cell_tilt.show()
            list_ret_tilt = []
            if(len(RET_Bloc) != 0):
                for ret in RET_Bloc:
                    if isinstance(el, bool):
                        pass
                    else:
                        dict_inter = {}
                        dict_inter["ret"] = ret.split()[0].split(",")[1].split("=")[1]
                        dict_inter["tilt"] = ret.split()[1]
                    list_ret_tilt.append(dict_inter)
                df_ret_tilt_initiale = spark.createDataFrame(pd.DataFrame(list_ret_tilt))
                
            else:
                schema = StructType([StructField('ret', StringType(), True), StructField('tilt', StringType(), True)])
                df_ret_tilt_initiale = spark.createDataFrame([], schema)
            df_ret_tilt_initiale.show()
            df_ret_cell_tilt_finale = df_ret_cell_tilt.join(df_ret_tilt_initiale, df_ret_cell_tilt["RET_name"] == df_ret_tilt_initiale["ret"], "left").join(df_cell_tilt_finale, ["cellname"], "left")
            df_ret_cell_tilt_finale.show()
            df_ret_cell_tilt_finale.createOrReplaceTempView("cell_tilt_stat")
            df_ret_cell_tilt_state = spark.sql("select cellname, RET_name, ret, tilt, bande, TiltElec_PREV, TiltElec_REF, case when tilt = TiltElec_PREV then 'OK' else 'NOK' end as check_valeur_ret, case when tilt = TiltElec_PREV then '' else RET_name||' tilt_conf '||tilt|| ' tilt_ref '|| TiltElec_PREV end as valeur_ret   from cell_tilt_stat where ret is not null")
            
            list_ret_cell_tilt_check = df_ret_cell_tilt_state.select('check_valeur_ret').rdd.flatMap(lambda x: x).collect()
            list_ret_cell_tilt_valeur = df_ret_cell_tilt_state.select('valeur_ret').rdd.flatMap(lambda x: x).collect()
                                               
            missing_RET_Result = Missing_RET_Check(dict_ret_state_finale, list_band_mimo_4G)
            if (missing_info_ret == False):
                if( len(missing_RET_Result) == 0):
                    dict_info_site_name["Missing_RET"] = " "
                    dict_info_site_name['check_Missing_RET'] = "OK"
                else:
                    
                    dict_info_site_name["Missing_RET"] = " / ".join(missing_RET_Result)
                    dict_info_site_name['check_Missing_RET'] = "NOK"
            else:
                dict_info_site_name["Missing_RET"] = "NO RET Configuration in Site or Cosite"
                dict_info_site_name['check_Missing_RET'] = "NA"
            if len(RET_Bloc) == 0:
                dict_info_site_name["RET_BB_vs_Antenna_matching"] = "NO RET Configuration in Site or Cosite"
                dict_info_site_name['check_RET_BB_vs_Antenna_matching'] = "NA"
            else:
                if len(RET_Bloc_nok) == 0:
                    dict_info_site_name["RET_BB_vs_Antenna_matching"] = ""
                    dict_info_site_name['check_RET_BB_vs_Antenna_matching'] = "OK"
                else:
                    RET_Bloc_nok_new = []
                    for el in RET_Bloc_nok:
                        if el.startswith('F'):
                            pass
                        else:
                            RET_Bloc_nok_new.append(el)
                    if len(RET_Bloc_nok_new) == 0:
                        dict_info_site_name["RET_BB_vs_Antenna_matching"] = ""
                        dict_info_site_name['check_RET_BB_vs_Antenna_matching'] = "OK"
                    else:
                        dict_info_site_name["RET_BB_vs_Antenna_matching"] = " ".join(RET_Bloc_nok_new)
                        dict_info_site_name['check_RET_BB_vs_Antenna_matching'] = "NOK"
            if len(list_ret_cell_tilt_check) !=0:
                if 'NOK' in ''.join(list_ret_cell_tilt_check):
                    dict_info_site_name["valeur_ret"] = " / ".join(filter(lambda x: x if x is not None else '', list_ret_cell_tilt_valeur))
                    dict_info_site_name['check_valeur_ret'] = "NOK"
                else:
                    dict_info_site_name["valeur_ret"] = " "
                    dict_info_site_name['check_valeur_ret'] = "OK"
            else:
                dict_info_site_name["valeur_ret"] = "NA"
                dict_info_site_name['check_valeur_ret'] = "NA"
                    
                    
            info_MIMO_4x4_or_MIMO_2x2_site_cosite = []
            for cell in list_data_cell_4G:
                list_inter_cell = []
                list_inter_cell.append('SectorCarrier')
                list_inter_cell.append(cell["cellname"])
                if(cell["RX"] =="2" or cell["TX"] =="2"):
                    list_inter_cell.append('2')
                else:
                    list_inter_cell.append('4')
                info_MIMO_4x4_or_MIMO_2x2_site_cosite.append(list_inter_cell)
            #print("info_MIMO_4x4_or_MIMO_2x2_site_cosite : ", info_MIMO_4x4_or_MIMO_2x2_site_cosite)
            all_rules_list = []
            with open(os.path.join(os.getcwd(), 'files/file_ref/Export_Antenne_RET_040122.csv')) as rules_r:
                for i_rules in rules_r:
                    if len(i_rules.split()) != 0:
                        all_rules_list.append(i_rules.rstrip())
            name_antenna = []
            name_antenna_parsed_values_for_rules = []
            #print(RET_Bloc)
            if len(RET_Bloc) != 0:
                for i_antenna in RET_Bloc:
                    if len(i_antenna.split()) < 2 or len(i_antenna.split()) == 2 :
                        pass
                    else:
                        name_antenna.append(i_antenna.split()[2])
                
                #parse antenna data so can be found in rules csv file
            
            for i in name_antenna:
                name_antenna_parsed_values_for_rules.append(i.rsplit('-', 1)[0])
           
            no_duplicates_name_antenna = list(set(name_antenna_parsed_values_for_rules))
            result_info_ret_config_conectors = []
            #print('no_duplicates_name_antenna :', no_duplicates_name_antenna)
            for con in RET_Bloc_connector:
                con_inter = []
                
                con_inter.extend(con.split()[0].split(","))
                con_inter.extend(con.split()[-2].split(","))
                con_inter.append(con.split()[-1])
                result_info_ret_config_conectors.append(con_inter)
            
            #print('result_info_ret_config_conectors : ', result_info_ret_config_conectors)
            result_rules_csv_text = parsing_data_for_csv_rules(all_rules_list,no_duplicates_name_antenna )
            #print("result_rules_csv_text : ", result_rules_csv_text)
            result_logical_funct_for_MIMO_RET_RULES_values = check_MIMO_RET_RULES( info_MIMO_4x4_or_MIMO_2x2_site_cosite, result_rules_csv_text, result_info_ret_config_conectors)
            #print("result_logical_funct_for_MIMO_RET_RULES_values : ", result_logical_funct_for_MIMO_RET_RULES_values)
            if len(info_MIMO_4x4_or_MIMO_2x2_site_cosite) != 0:
                # Setting status for RET configuration: taking account of : MIMO comaprison, 3G comparison and RET Connectors Comparions vs Rules
                    if result_logical_funct_for_MIMO_RET_RULES_values == None:
                        
                        dict_info_site_name['RET_Connectors'] = 'NO RET Configuration in Site or Cosite'
                        dict_info_site_name['Check_RET_Connectors'] = "NOK"
                        
                    elif not result_logical_funct_for_MIMO_RET_RULES_values:
                        dict_info_site_name['RET_Connectors'] = result_logical_funct_for_MIMO_RET_RULES_values
                        dict_info_site_name['Check_RET_Connectors'] = 'OK'
                        
                    else:
                        if result_logical_funct_for_MIMO_RET_RULES_values =='NO Rules' or len(result_rules_csv_text) == 0:
                            dict_info_site_name['RET_Connectors'] = result_logical_funct_for_MIMO_RET_RULES_values
                            dict_info_site_name['Check_RET_Connectors'] = 'NOK (model d’antenne non repertoriée)'
                            
                        elif 'Antenne dupliquée' in result_logical_funct_for_MIMO_RET_RULES_values:
                            dict_info_site_name['RET_Connectors'] = result_logical_funct_for_MIMO_RET_RULES_values
                            dict_info_site_name['Check_RET_Connectors'] = 'NOK (model d’antenne dupliquée)'
                            
                        else:
                            dict_info_site_name['RET_Connectors'] = result_logical_funct_for_MIMO_RET_RULES_values
                            dict_info_site_name['Check_RET_Connectors'] = 'NOK'
                            
                        
            else:
                dict_info_site_name['RET_Connectors'] = 'NO RET Configuration in Site or Cosite'
                dict_info_site_name['Check_RET_Connectors'] ="NOK"
            if(len(no_duplicates_name_antenna) != 0):
                dict_info_site_name["Antenna_name"] = no_duplicates_name_antenna[0]
            else:
                dict_info_site_name["Antenna_name"] = ''
            synchro_block = read_block(f, 'MOdlChannelBandwidthearfcndlearfcnululChannelBandwidth', '#InformationsSDI:')
            f.seek(0)
            remove_equals(synchro_block)
            remove_equals(synchro_block)
            extract_list_values_ngs = {}
            #print(synchro_block)
            if (len(synchro_block) == 0):
                dict_info_site_name["administrativestate"] = "NA"
                dict_info_site_name['check_administrativestate'] = "NA"
                dict_info_site_name['syncNodePriority'] = "NA"
                dict_info_site_name['syncRiPortStatus'] = "NA"
                dict_info_site_name['check_synchronisation'] = 'NA'
            else:
                for el in synchro_block:
                    if "administrativeState" in el:
                        administrativeState = el.split()
                    #print(type(administrativeState[1]))
                        
                        extract_list_values_ngs['administrativestate'] = str(administrativeState[1])
                    elif "syncNodePriority" in el:
                        syncNodePriority = el.split()
                        print("problem Synchro prio")
                        extract_list_values_ngs['syncNodePriority'] = str(syncNodePriority[1])
                    elif "syncRiPortStatus" in el:
                        syncRiPortStatus = el.split()
                        extract_list_values_ngs['syncRiPortStatus'] = ' '.join([i for i in syncRiPortStatus if "ACTIVE" in i])
                    else:
                        pass
                #print("extract_list_values_ngs : ", extract_list_values_ngs)
                if extract_list_values_ngs !={}:
                    dict_info_site_name["administrativestate"] = extract_list_values_ngs['administrativestate']
                    if extract_list_values_ngs['administrativestate'] == '1':
                        dict_info_site_name['check_administrativestate'] = 'OK'
                    else:
                        dict_info_site_name['check_administrativestate'] = 'NOK'
                    
                    if 'syncNodePriority' not in extract_list_values_ngs.keys() and 'syncRiPortStatus' not in extract_list_values_ngs.keys():
                        dict_info_site_name['syncNodePriority'] = "NA"
                        dict_info_site_name['syncRiPortStatus'] = "NA"
                        dict_info_site_name['check_synchronisation'] = 'NA'
                    elif extract_list_values_ngs['syncNodePriority'] == '1' and 'OK_NOT_ACTIVE' in extract_list_values_ngs['syncRiPortStatus']:
                        dict_info_site_name['syncNodePriority'] = extract_list_values_ngs['syncNodePriority']
                        dict_info_site_name['syncRiPortStatus'] = extract_list_values_ngs['syncRiPortStatus']
                        dict_info_site_name['check_synchronisation'] = 'OK'
                    elif extract_list_values_ngs['syncNodePriority'] == '2' and 'OK_ACTIVE' in extract_list_values_ngs['syncRiPortStatus']:
                        dict_info_site_name['syncNodePriority'] = extract_list_values_ngs['syncNodePriority']
                        dict_info_site_name['syncRiPortStatus'] = extract_list_values_ngs['syncRiPortStatus']
                        dict_info_site_name['check_synchronisation'] = 'OK'
                    else:
                        dict_info_site_name['syncNodePriority'] = extract_list_values_ngs['syncNodePriority']
                        dict_info_site_name['syncRiPortStatus'] = extract_list_values_ngs['syncRiPortStatus']
                        dict_info_site_name['check_synchronisation'] = 'NOK'
                else:
                    dict_info_site_name["administrativestate"] = ""
                    dict_info_site_name['check_administrativestate'] = 'NA'
                    dict_info_site_name['syncNodePriority'] = ""
                    dict_info_site_name['syncRiPortStatus'] = ""
                    dict_info_site_name['check_synchronisation'] = 'NA'

           
            alarms_text_block = read_block(f, 'Date&Time(UTC)SSpecificProblemMO(Cause/AdditionalInfo)', '0ManagedElement=')
            f.seek(0)
            remove_equals(alarms_text_block)
            remove_equals(alarms_text_block)
            #print(alarms_text_block)
            if len(alarms_text_block) == 0:
                #print("check alarm : ", 'OK')
                dict_info_site_name["check_alarm"] = "OK"
                dict_info_site_name["List_alarm"] = " "
            else:
                dict_info_site_name["check_alarm"] = "NOK"
                dict_info_site_name["List_alarm"] = "  ".join(alarms_text_block)
            synchro_enabled_bloc = read_block(f, '#Informationssynchro:', '#InformationsCell/SectorCarrier:')
            f.seek(0)
            synch_enabled =  []
            print("problem Synchro time")
            for el in synchro_enabled_bloc:
                if('ENABLED' in el.split(":")[1]):
                    pass
                else:
                    synch_enabled.append(el.split(":")[0]+ " :DISABLED ")
                
            if(len(synch_enabled) == 0):
                dict_info_site_name['Synchro_Time_Phase'] = " " 
                dict_info_site_name['Check_Synchro_Time_Phase'] = "OK" 
            else:
                dict_info_site_name['Synchro_Time_Phase'] = " | ".join(synch_enabled) 
                dict_info_site_name['Check_Synchro_Time_Phase'] = "OK"
            bloc_IPSEC = read_block(f, '#InformationsInner/IPSEC', '#InformationsAntennaUnitGroup/Secteur:')
            f.seek(0)
            List_IPSEC_4G = []
            List_IPSEC_5G = []
            for el in bloc_IPSEC :
                if("IpsecTunnel" in el and 'LTE' in el):
                    List_IPSEC_4G.append(el)
                if("IpsecTunnel" in el and '5G' in el):
                    List_IPSEC_5G.append(el)
            if('Pas de cellules 5G' not in ''.join(cell_sector_5G)):
                if('DISABLED' not in "".join(List_IPSEC_5G)):
                    dict_info_site_name['IPSEC_5G_Enabled_Disabled'] = " " 
                    dict_info_site_name['Check_IPSEC_5G_Enabled_Disabled'] = "OK"
                else:
                    dict_info_site_name['IPSEC_5G_Enabled_Disabled'] = " | ".join(List_IPSEC_5G)
                    dict_info_site_name['Check_IPSEC_5G_Enabled_Disabled'] = "NOK"
            else:
                dict_info_site_name['IPSEC_5G_Enabled_Disabled'] = "Absence Cellule 5G" 
                dict_info_site_name['Check_IPSEC_5G_Enabled_Disabled'] = "NA"
                
            if('Pas de cellules 4G' not in ''.join(cell_sector_5G)):
                if('DISABLED' not in "".join(List_IPSEC_4G)):
                    dict_info_site_name['IPSEC_4G_Enabled_Disabled'] = " " 
                    dict_info_site_name['Check_IPSEC_4G_Enabled_Disabled'] = "OK"
                else:
                    dict_info_site_name['IPSEC_4G_Enabled_Disabled'] = " | ".join(List_IPSEC_4G)
                    dict_info_site_name['Check_IPSEC_4G_Enabled_Disabled'] = "NOK"
            else:
                dict_info_site_name['IPSEC_4G_Enabled_Disabled'] = "Absence Cellule 4G" 
                dict_info_site_name['Check_IPSEC_4G_Enabled_Disabled'] = "NA"

            bloc_DSS_Check_1 = read_block(f, '1)InfoNextHop', '2)Infoessenabled:')
            f.seek(0)
            print("problem DSS1")
            for k in bloc_DSS_Check_1:
                check_inner = ''
                if len(k.split(":")) > 1:
                    check_inner = k.split(":")[1]
                if ('Router=Inner_5G' in check_inner) :
                    dict_info_site_name['Inner_5G_IP'] = k.split("|")[1].split("=")[1].strip()
                if ('Router=Inner_LTE' in check_inner) :
                    dict_info_site_name['Inner_LTE_IP'] = k.split("|")[1].split("=")[1].strip()
            if ('Inner_LTE_IP' not in dict_info_site_name.keys()):
                dict_info_site_name['Inner_LTE_IP'] = ''
            if ('Inner_5G_IP' not in dict_info_site_name.keys()):
                dict_info_site_name['Inner_5G_IP'] = ''
            bloc_DSS_Check_3 = read_block(f, '2)Infoessenabled:', '#InformationsInner/IPSEC:')
            f.seek(0)
            list_DSS_Check_3 = []
            for el in bloc_DSS_Check_3:
                if 'NRCellCU' in el:
                    list_DSS_Check_3.append(el)
            #print(list_DSS_Check_3)
            DSS_Check_3_nok = []
            if(len(list_DSS_Check_3) == 0 and 'Pas de cellules 5G'  in ''.join(cell_sector_5G)):
                dict_info_site_name['DSS_Check_3'] = "Absence Cellule 5G"
                dict_info_site_name['Check_DSS_Check_3'] = 'NA'
            else:
                if(len(list_DSS_Check_3) == 0 and 'Pas de cellules 5G'  not in ''.join(cell_sector_5G)):
                    dict_info_site_name['DSS_Check_3'] = "Absence conf DSS Check 3"
                    dict_info_site_name['Check_DSS_Check_3'] = 'NA'
                else:
                    for el in list_DSS_Check_3:
                        if ('true' in el):
                            pass
                        else:
                            DSS_Check_3_nok.append(el)
                    if(len(DSS_Check_3_nok) == 0):
                        dict_info_site_name['DSS_Check_3'] = ''
                        dict_info_site_name['Check_DSS_Check_3'] = 'OK'
                    else:
                        dict_info_site_name['DSS_Check_3'] = ''.join(DSS_Check_3_nok)
                        dict_info_site_name['Check_DSS_Check_3'] = 'NOK'
                
                
            
            SFP_block = read_block(
                f, 'ID;LINK;RiL;VENDOR1;VENDORPROD1;REV1;SERIAL1;DATE1;ERICSSONPROD1;VENDOR2;VENDORPROD2;REV2;SERIAL2;DATE2;ERICSSONPROD2', '---------------')
            f.seek(0)
            remove_equals(SFP_block)
            remove_equals(SFP_block)
            #print("SFP_block : ", SFP_block)
            print("problem SFP")
            SFP_block_nok = []
            if len(SFP_block) == 0 :
                dict_info_site_name['SFP'] = 'Absence de Conf SPF'
                dict_info_site_name['Check_SFP'] = 'NA'
            else :
                #print(SFP_block)
                for el in SFP_block:
                    #print(el)
                    #print(el.split())
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
                    dict_info_site_name['SFP'] = ''
                    dict_info_site_name['Check_SFP'] = 'OK'
                else:
                    dict_info_site_name['SFP'] = '/'.join(SFP_block_nok)
                    dict_info_site_name['Check_SFP'] = 'NOK'
            
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
            if(len(list_info2) != 0 and len(list_5G) >= 1 and 'Pas de cellules 5G' not in ''.join(cell_sector_5G)):
                if(len(list_info1) == 0):
                    dict_info_site_name['Activation_Compteur'] = "Absence XML"
                    dict_info_site_name['Check_Activation_Compteur'] = "NOK"
                   
                else:
                    dict_info_site_name['Activation_Compteur'] = " "
                    dict_info_site_name['Check_Activation_Compteur'] = "OK"
            else:
                if(len(list_info2) != 0 and 'Pas de cellules 5G' in ''.join(cell_sector_5G)):
                    if(len(list_info1) == 0):
                        dict_info_site_name['Activation_Compteur'] = "Absence XML"
                        dict_info_site_name['Check_Activation_Compteur'] = "NOK"
                    else:
                        dict_info_site_name['Activation_Compteur'] = " "
                        dict_info_site_name['Check_Activation_Compteur'] = "OK"
                else:
                    if(len(list_info2) == 0 and 'Pas de cellules 5G' not in ''.join(cell_sector_5G)):
                        dict_info_site_name['Activation_Compteur'] = "Cellule 5G existe/Absence Compteur 5G"
                        dict_info_site_name['Check_Activation_Compteur'] = "NOK"
                    elif (len(list_info2) == 0 and 'Pas de cellules 5G' not in ''.join(cell_sector_5G)):
                        dict_info_site_name['Activation_Compteur'] = "Absence Cellule 5G/Compteur 5G existe"
                        dict_info_site_name['Check_Activation_Compteur'] = "NOK"
                        
                    else:
                        dict_info_site_name['Activation_Compteur'] = " "
                        dict_info_site_name['Check_Activation_Compteur'] = "OK"
            Bloc_RfPort = read_block(
                f, '#InformationsauPortRef/rfPortRef:', '#InformationsRU:')
            remove_equals(Bloc_RfPort)
            remove_equals(Bloc_RfPort)
            print("problem rf port")
            rfbranch_rfport_text_block = Bloc_RfPort[1:-1]
            f.seek(0)
            dict_rfbranch_rfport = extract_rfbranch_rfport(
                rfbranch_rfport_text_block)
            conf_rfbranch_rfport_value, conf_rfbranch_rfport_status = check_auportref_rfportref(
                    dict_rfbranch_rfport)
            check_auportref_rfportref
            dict_info_site_name['Mapping_Rfport'] = conf_rfbranch_rfport_value
            dict_info_site_name['Check_Mapping_Rfport'] = conf_rfbranch_rfport_status
            list_info_site.append(dict_info_site_name)
            df_info_site = spark.createDataFrame(pd.DataFrame(list_info_site))
            df_info_site.createOrReplaceTempView("int_info_site")
            df_info_site.show()
            df_info_site_dss = spark.sql(query_DSS)
            df_info_site_dss.createOrReplaceTempView('info_site_dss')
            df_BDR_Erc_EutranCellFDD.createOrReplaceTempView('BDR_Erc_EutranCellFDD')
            df_info_eran_finale = spark.sql(query_info_eran)
            #df_info_eran_finale.show()
            #df_mainview_stat_3 = df_mainview_stat.join(df_mainview_stat_2 , df_mainview_stat.NumPrj == df_mainview_stat_2.NumPrj, "left")
            #df_mainview_stat_3.show()
            df_mainview_stat_4 = spark.sql("select distinct MainView.NumPrj as site_theorique , MainView.NeName from MainView")
            df_mainview_stat_4 = df_mainview_stat_4.filter(df_mainview_stat_4.NeName.like('%'+dict_info_site_name["SiteName"]+"%"))
            if(dict_info_site_name["SiteName"].startswith("X")):
                df_mainview_stat_5 = df_mainview_stat_4.join(df_mainview_stat_2 , df_mainview_stat_4.NeName == df_mainview_stat_2.NeName_X , 'left' ).join(df_mainview_stat, df_mainview_stat_4.site_theorique == df_mainview_stat.site_theorique_E, 'left' )
            elif (dict_info_site_name["SiteName"].startswith("E")):
                df_mainview_stat_5 = df_mainview_stat_4.join(df_mainview_stat , df_mainview_stat_4.NeName == df_mainview_stat.NeName_E , 'left' ).join(df_mainview_stat_2, df_mainview_stat_4.site_theorique == df_mainview_stat_2.site_theorique_X, 'left' )
            df_mainview_stat_5.createOrReplaceTempView('df_mainview_stat_5') 
            df_mainview_stat_finale = spark.sql("select site_theorique, NeName, site_theorique_X, NeName_X, techno_X, site_theorique_E, NeName_E, techno_E, CASE when NeName_E is null then 'Pas de noeud Exxxx à supprimer' else 'Noeud a supprimer' end as Check_Noeud_A_Supprimer from  df_mainview_stat_5")
        
            list_noeud_to_delete_new = []
            list_noeud_to_delete = []
            list_noeud_to_delete = list(df_mainview_stat_finale.select("NeName_E").toPandas()['NeName_E'])
            for el in list_noeud_to_delete:
                if el is None:
                    pass
                else:
                    list_noeud_to_delete_new.append(el)
            if len(list_noeud_to_delete_new) != 0:
                df_mainview_stat_finale = df_mainview_stat_finale.withColumn("Check_Noeud_A_Supprimer", lit("/".join(list_noeud_to_delete_new) + " : Noeud à supprimer"))
            df_mainview_stat_finale.createOrReplaceTempView('df_mainview_stat_finale')
            df_mainview_stat_finale = spark.sql("select NeName as nename, check_noeud_a_supprimer from df_mainview_stat_finale ")
            df_info_eran_finale_modif = df_info_eran_finale.join(df_mainview_stat_finale, df_info_eran_finale.SiteName == df_mainview_stat_finale.nename, 'left')
            df_info_eran_finale_modif.show()
            df_info_eran_finale_modif.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="info_eran", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
            df_info_eran_finale.createOrReplaceTempView("info_eran")
            print("before done")
            df_licence_alarm_ngs = spark.sql(query_licence_alarm_ngs)
            #df_licence_alarm_ngs.show()
            df_licence_alarm_ngs.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="info_licence_alarm_ngs", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
            
            df_licence_alarm_ngs.createOrReplaceTempView("info_licence_alarm_ngs")
            df_mimo_handover_perf = spark.sql(query_mimo_handover_perf)
            #df_mimo_handover_perf.show()
            df_mimo_handover_perf.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="info_mimo_ho_perf", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
            
            df_mimo_handover_perf.createOrReplaceTempView("info_mimo_ho_perf")
            df_info_4G_gen = spark.sql(query_info_4G_gen)
            #df_info_4G_gen.show()
            df_info_4G_gen.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="info_gen_4G", mode="append", properties={"user": "*", "password": "*", "driver":"org.postgresql.Driver"})
            #df_info_4G_gen.show()
            df_info_4G_gen.createOrReplaceTempView("info_gen_4g")
            print("info site done")
            df_table_sythese = spark.sql(query_3)
            df_table_sythese.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
            df_table_sythese =  spark.sql(query_4)
            df_table_sythese.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
            df_table_sythese =  spark.sql(query_5)
            df_table_sythese.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
            df_table_sythese =  spark.sql(query_6)
            df_table_sythese.write.jdbc(url="jdbc:postgresql://localhost:5432/qoc_django_db_new_db", table="synthese_site", mode="append", properties={"user": "*", "password": "*", "driver": "org.postgresql.Driver"})
            print("done! :) ")
            
            
            

    spark.sparkContext.stop()