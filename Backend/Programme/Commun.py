import os
import sys
import datetime
from itertools import groupby
from qoc_backend.settings import BASE_DIR, MANAGER_EMAIL
from zipfile import ZipFile
from django.http import HttpResponse
import xlwt
from xlrd import open_workbook
from xlutils.copy import copy
import xlsxwriter
import shutil
import json
from collections import Counter



def insert_product (list_cell, band_Product_RF):
    
    for el in list_cell:
        if 'userLabel' in el.keys():
            if el['userLabel'].startswith('U') or el['userLabel'].startswith('V') or el['userLabel'].startswith('W'):
                el["Rf_Conf"] = band_Product_RF['2100']
            elif el['userLabel'].startswith('G'):
                el["Rf_Conf"] = band_Product_RF['900']
            else:
                el["Rf_Conf"] = ''
        else:
            
            if(el['cellname'].startswith('P') or el['cellname'].startswith('Y') ):
                el["Rf_Conf"] = band_Product_RF['2100']
            elif ( el['cellname'].startswith('C')):
                el["Rf_Conf"] = band_Product_RF['900']
            elif (el['cellname'].startswith('L') ):
                el["Rf_Conf"] = band_Product_RF['2600']
            elif (el['cellname'].startswith('D') ):
                el["Rf_Conf"] = band_Product_RF['1800']
            elif (el['cellname'].startswith('T') ):
                el["Rf_Conf"] = band_Product_RF['800']
            elif (el['cellname'].startswith('K') ):
                el["Rf_Conf"] = band_Product_RF['700']
            else:
                el["Rf_Conf"] = ''
    return list_cell
        
def flatten(nested_list):
    for item in nested_list:
        if not isinstance(item[0],list):
            yield item
        else:
            yield from flatten(item)

def get_elixir_file_path(rules_file_path, file_start):
    dict_radio_file = {}
    for i in os.listdir(rules_file_path):
        if(file_start in i and '.zip' in i):
            date_file = datetime.datetime.strptime((i.split("_")[-1]).split(".")[0],"%Y-%m-%d")
            dict_radio_file[date_file] = rules_file_path + '/'+ i
    if(len(list(dict_radio_file.keys())) != 0):
        if(os.path.getsize(dict_radio_file[max(dict_radio_file.keys())]) > 0):
            path = dict_radio_file[max(dict_radio_file.keys())]
            return path
        else:
            print(" '!!!! Warning !!!!\n'")
            print(' le fichier qui contient les info radio est vide.'.format(dict_radio_file[max(dict_radio_file.keys())]))
            ##sys.exit(' Veuillez ajouter un nouveau fichier.\n Exit Script!')
            return ''
    else:
        print(" '!!!! Warning !!!!\n'")
        print(' le fichier qui contient les info radio est introuvable.')
        ##sys.exit(' Veuillez ajouter le fichier.\n Exit Script!')
        return ''
    
def get_rules_file_path(rules_file_path, file_start):
    dict_radio_file = {}
    print(" im here file")
    for i in os.listdir(rules_file_path):
        if(file_start in i):
            date_file = datetime.datetime.strptime((i.split("_")[-2]),"%Y%m%d")
            dict_radio_file[date_file] = rules_file_path + '/'+ i
    if(len(list(dict_radio_file.keys())) != 0):
        if(os.path.getsize(dict_radio_file[max(dict_radio_file.keys())]) > 0):
            path = dict_radio_file[max(dict_radio_file.keys())]
            return path
        else:
            print(" '!!!! Warning !!!!\n'")
            print(' le fichier qui contient les info radio est vide.'.format(dict_radio_file[max(dict_radio_file.keys())]))
            ##sys.exit(' Veuillez ajouter un nouveau fichier.\n Exit Script!')
            return ''
    else:
        print(" '!!!! Warning !!!!\n'")
        print(' le fichier qui contient les info radio est introuvable.')
        ##sys.exit(' Veuillez ajouter le fichier.\n Exit Script!')
        return ''
def read_block(seq, start, end):
    a = []
    copy = False
    for line in seq:
        # print(line)
        test_line_strip = line.replace(" ", "")
        if test_line_strip.startswith(start):
            copy = True
            continue
        elif test_line_strip.startswith(end):
            copy = False
            continue
        elif copy:
            a.append(line)
    list_a = list(filter(lambda item: item.strip(), a))
    list_b = [i.strip() for i in list_a]
    return (list_b)



def remove_equals(block_text_equal):
    for i in block_text_equal:
        if i.startswith('====================================================================='):
            block_text_equal.remove(i)
        elif i.startswith('================================'):
            block_text_equal.remove(i)
        elif i.startswith('----------------------------------------'):
            block_text_equal.remove(i)
        elif i.startswith('**************************'):
            block_text_equal.remove(i)
    return block_text_equal


def Extract_Data_Frame_4G(list_4G, file, info_pmRadioTxRankDistr_new , info_EUtranFreqRelation_new, date_creation, programme, Date_Ref, zone, eNBId, bande_ligne, base_bande_value):
    list_data_frame_4G = []
    for el in list_4G:
        dict_inter = {}
        dict_inter["Date_Ref"] = Date_Ref
        dict_inter["Programme"] = programme
        dict_inter["date_insertion"] = date_creation
        if(".txt" in file.split("_")[2]):
            dict_inter["SiteName"] = file.split("_")[2].split(".")[0].strip()
        else:
            dict_inter["SiteName"] = file.split("_")[2].strip()
        dict_inter["cellname"] = el.split("|")[0].split(":")[0].split("/")[0].strip()
        dict_inter["zone"] = zone.strip()
        if( eNBId =={}):
            dict_inter['eNBId'] = ''
        else:
            dict_inter['eNBId'] = eNBId[file.split("_")[2].split(".")[0].strip()].strip()
        if(dict_inter["cellname"].startswith('P')):
            dict_inter["ProductName"] = bande_ligne["2100"]
        if(dict_inter["cellname"].startswith('L')):
            dict_inter["ProductName"] = bande_ligne["2600"]
        if(dict_inter["cellname"].startswith('D')):
            dict_inter["ProductName"] = bande_ligne["1800"]
        if(dict_inter["cellname"].startswith('T')):
            dict_inter["ProductName"] = bande_ligne["800"]
        if(dict_inter["cellname"].startswith('K')):
            dict_inter["ProductName"] = bande_ligne["700"]
        dict_inter[el.split("|")[0].split(":")[0].split("/")[1].split(" ")[1]] = el.split("|")[0].split(":")[0].split("/")[1].split(" ")[2].strip()
        dict_inter[el.split("|")[0].split(":")[1].split("=")[0].strip()] = el.split("|")[0].split(":")[1].split("=")[1].strip()
        for j in el.split("|")[1:]:
            if('x' in j and 'configuredMaxTxPower' not in j and 'qRxLevMin' not in j):
                for k in range(0,len(j.split("=")[0].split("x"))):
                    dict_inter[j.split("=")[0].split("x")[k].strip()] = j.split("=")[1].split("x")[k].strip()
            else:
                dict_inter[j.split("=")[0].strip()] = j.split("=")[1].strip()
        if(info_pmRadioTxRankDistr_new !={}):
            for el in info_pmRadioTxRankDistr_new.keys():
                if el.strip() == dict_inter["cellname"]:
                    dict_inter["pmRadioTxRankDistr"] = str(info_pmRadioTxRankDistr_new[el]).strip()
                if("pmRadioTxRankDistr" not in dict_inter.keys()):
                    dict_inter["pmRadioTxRankDistr"]  = ' '
        else:
            dict_inter["pmRadioTxRankDistr"]  = ' '
        list_relation = []
        if (len(info_EUtranFreqRelation_new) != 0):
            for el in info_EUtranFreqRelation_new:
                if(dict_inter["cellname"] in el):
                    list_relation.append("vs".join(el.split("vs")[1:]))
                if len(list_relation) != 0:
                    dict_inter["EUtranFreqRelation"] = ' '.join(list_relation)
                else:
                    dict_inter["EUtranFreqRelation"] = ' '
        else:
            dict_inter["EUtranFreqRelation"] = ' '
        dict_inter["base_bande"] = base_bande_value
        list_data_frame_4G.append(dict_inter)
        
    for j in list_data_frame_4G:
        if(j['essScLocalId'] == '0'  and j['essScPairId'] == '0'):
            j.update({'Check_DSS_2' : "OK"})
        else:
            if("10" in j['essScPairId'] ):
                essc = j['essScLocalId'] 
                j.update({'essScLocalId': essc.replace("10", ""),'Check_DSS_2' : "OK"})
            else:
                essc = j['essScLocalId'] 
                j.update({'essScLocalId': essc.replace("10", ""),'Check_DSS_2' : "NOK"})
                
    return list_data_frame_4G
                    

                    
                    
def Extract_bloc_RET(text_file_path_cosite, text_file_path):
    RET_Bloc_site = []
    RET_Bloc_connector_site = []
    RET_Bloc_cosite = []
    RET_Bloc_connector_cosite = []
    if(text_file_path != False):
        with open(text_file_path) as file1:
            RET_Bloc_site = read_block(file1, "MOelectricalAntennaTiltiuantAntennaModelNumberiuantInstallersIdiuantSectorId", "Total")
            remove_equals(RET_Bloc_site)
            remove_equals(RET_Bloc_site)
            file1.seek(0)
            RET_Bloc_connector_site = read_block(file1, "MOadministrativeStateantennaNearUnitIdiuantDeviceTypeonUnitUniqueIdoperationalStateproductNumberrfPortRefserialNumber", "Total")
            remove_equals(RET_Bloc_connector_site)
            remove_equals(RET_Bloc_connector_site)
            file1.seek(0)
        file1.close()
    if(text_file_path_cosite!= False):
        with open(text_file_path_cosite) as file2:
            RET_Bloc_cosite = read_block(file2, "MOelectricalAntennaTiltiuantAntennaModelNumberiuantInstallersIdiuantSectorId", "Total")
            remove_equals(RET_Bloc_cosite)
            remove_equals(RET_Bloc_cosite)
            file2.seek(0)
            RET_Bloc_connector_cosite = read_block(file2, "MOadministrativeStateantennaNearUnitIdiuantDeviceTypeonUnitUniqueIdoperationalStateproductNumberrfPortRefserialNumber", "Total")
            remove_equals(RET_Bloc_connector_cosite)
            remove_equals(RET_Bloc_connector_cosite)
            file2.seek(0)
        file2.close()
    RET_Bloc_site.extend(RET_Bloc_cosite)
    if([] in RET_Bloc_site):
        RET_Bloc_site.remove([])
    RET_Bloc_connector_site.extend(RET_Bloc_connector_cosite)
    if([] in RET_Bloc_connector_site):
        RET_Bloc_connector_site.remove([])
        

    
    return RET_Bloc_site, RET_Bloc_connector_site
   
        
    
    
def extract_band_mimo_4G(list_data_cell_4G):
                list_band_mimo_4G = []
                dic_cell_band = {"T" : '800',"D" : '1800',"P" : '2100', "L" : '2600', "K" : '700'}
                for el in list_data_cell_4G:
                    if(el["cellname"].startswith("T")):
                        if {dic_cell_band['T'] : el['RX']+" x "+el['TX'] } in list_band_mimo_4G:
                            pass
                        else:
                            list_band_mimo_4G.append({dic_cell_band['T'] : el['RX']+" x "+el['TX'] })
                    elif(el["cellname"].startswith("D")):
                        if {dic_cell_band['D'] : el['RX']+" x "+el['TX']} in list_band_mimo_4G:
                            pass
                        else:
                            list_band_mimo_4G.append({dic_cell_band['D'] : el['RX']+" x "+el['TX']})
                    elif(el["cellname"].startswith("P")):
                        if {dic_cell_band['P'] : el['RX']+" x "+el['TX'] } in list_band_mimo_4G:
                            pass
                        else:
                            list_band_mimo_4G.append({dic_cell_band['P'] : el['RX']+" x "+el['TX']})
                    elif(el["cellname"].startswith("L")):
                        if {dic_cell_band['L'] : el['RX']+" x "+el['TX'] } in list_band_mimo_4G:
                            pass
                        else:
                            list_band_mimo_4G.append({dic_cell_band['L'] : el['RX']+" x "+el['TX'] })
                    elif(el["cellname"].startswith("K")):
                        if {dic_cell_band['K'] : el['RX']+" x "+el['TX'] } in list_band_mimo_4G:
                            pass
                        else:
                            list_band_mimo_4G.append({dic_cell_band['K'] : el['RX']+" x "+el['TX'] })
                return list_band_mimo_4G
    
def extract_data_with_ret(RET_Bloc, RET_Bloc_connector, list_data_cell_4G):
                Ret_List = []
                Ret_List_antenne = []
                for el in RET_Bloc_connector:
                    Ret_List.append(el.split()[3])
                for el in RET_Bloc:
                    Ret_List_antenne.append(el.split()[1])
                #print("test : ", list(set(Ret_List_antenne)))
                List_Cell_Ret = []
                match_band_ret = {"700" : "K", "800" : "L", "900": "G", "1400" : "F", "1800" : "D", "2600" : "E", "3500" : "Q", "2100" : "U"}
                for el in list_data_cell_4G:
                    if(el["cellname"].startswith("T")):
                        el['Band_Cell'] = "800"
                        for j in Ret_List:
                            if j.startswith(match_band_ret[el['Band_Cell']]):
                                if(el['secteur'] in ["1", "4", "7", "10", "13", "16", "19"] and j.endswith("1") ):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["2", "5", "8", "11", "14", "17", "20"] and j.endswith("2")):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["3", "6", "9", "12", "15", "18", "21"] and j.endswith("3")):
                                    el['RET_name'] = j
                    
                    elif(el["cellname"].startswith("K")):
                        el['Band_Cell'] = "700"
                        for j in Ret_List:
                            if j.startswith(match_band_ret[el['Band_Cell']]):
                                if(el['secteur'] in ["1", "4", "7", "10", "13", "16", "19"] and j.endswith("1") ):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["2", "5", "8", "11", "14", "17", "20"] and j.endswith("2")):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["3", "6", "9", "12", "15", "18", "21"] and j.endswith("3")):
                                    el['RET_name'] = j
                    elif(el["cellname"].startswith("D")):
                        el['Band_Cell'] = "1800"
                        for j in Ret_List:
                            if j.startswith(match_band_ret[el['Band_Cell']]):
                                if(el['secteur'] in ["1", "4", "7", "10", "13", "16", "19"] and j.endswith("1") ):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["2", "5", "8", "11", "14", "17", "20"] and j.endswith("2")):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["3", "6", "9", "12", "15", "18", "21"] and j.endswith("3")):
                                    el['RET_name'] = j
                    elif(el["cellname"].startswith("L")):
                        el['Band_Cell'] = "2600"
                        for j in Ret_List:
                            if j.startswith(match_band_ret[el['Band_Cell']]):
                                if(el['secteur'] in ["1", "4", "7", "10", "13", "16", "19"] and j.endswith("1") ):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["2", "5", "8", "11", "14", "17", "20"] and j.endswith("2")):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["3", "6", "9", "12", "15", "18", "21"] and j.endswith("3")):
                                    el['RET_name'] = j
                    elif(el["cellname"].startswith("P")):
                        el['Band_Cell'] = "2100"
                        for j in Ret_List:
                            if j.startswith(match_band_ret[el['Band_Cell']]):
                                if(el['secteur'] in ["1", "4", "7", "10", "13", "16", "19"] and j.endswith("1") ):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["2", "5", "8", "11", "14", "17", "20"] and j.endswith("2")):
                                    el['RET_name'] = j
                                elif(el['secteur'] in ["3", "6", "9", "12", "15", "18", "21"] and j.endswith("3")):
                                    el['RET_name'] = j
                dict_ret_state = {}
                for el in list_data_cell_4G:
                    if('RET_name' not in el.keys()):
                        dict_ret_state[el['Band_Cell']] = False
                    else:
                        dict_ret_state[el['Band_Cell']] = True
                return list_data_cell_4G, dict_ret_state,  Ret_List_antenne, Ret_List
            
    
    
def Extract_Data_Frame_5G(list_5G, file, date_creation, programme, Date_Ref, zone, gNBId, bande_ligne, base_bande_value):
   # print(list_5G)
    list_data_frame_5G = []
    for el in list_5G:
        dict_inter = {}
        dict_inter["Date_Ref"] = Date_Ref
        dict_inter["Programme"] = programme
        dict_inter["date_insertion"] = date_creation
        if(".txt" in file.split("_")[2]):
            dict_inter["SiteName"] = file.split("_")[2].split(".")[0].strip()
        else:
            dict_inter["SiteName"] = file.split("_")[2].strip()
        dict_inter["cellname"] = el.split("|")[0].split(":")[0].split("/")[0].strip()
        dict_inter["zone"] = zone.strip()
        if(gNBId == {}):
            dict_inter['gNBId'] = ''
        else:
            dict_inter['gNBId'] = gNBId[file.split("_")[2].split(".")[0].strip()].strip()
        if bande_ligne == {}:
            dict_inter["ProductName"] = ''
        else:
            if(dict_inter["cellname"].startswith('Y')):
                dict_inter["ProductName"] = bande_ligne['2100']
            if(dict_inter["cellname"].startswith('Q')):
                dict_inter["ProductName"] = bande_ligne['3500']
        dict_inter[el.split("|")[0].split(":")[1].split("=")[0].strip()] = el.split("|")[0].split(":")[1].split("=")[1].strip()
        for j in el.split("|")[1:]:
            if('x' in j and 'configuredMaxTxPower' not in j and 'Antennas' not in j):
                for k in range(0,len(j.split("=")[0].split("x"))):
                    dict_inter[j.split("=")[0].split("x")[k].strip()] = j.split("=")[1].split("x")[k].strip()
                    
            else:
                if( "noOfRxAntennas x noOfTxAntennas" in j):
                    dict_inter['noOfRxAntennas'] = j.split("=")[1].split("x")[0].strip()
                    dict_inter['noOfTxAntennas'] = j.split("=")[1].split("x")[1].strip()
                elif ("noOfUsedRxAntennas x noOfUsedTxAntennas" in j):
                    dict_inter['noOfUsedRxAntennas'] = j.split("=")[1].split("x")[0].strip()
                    dict_inter['noOfUsedTxAntennas'] = j.split("=")[1].split("x")[1].strip()
                else:
                    dict_inter[j.split("=")[0].strip()] = j.split("=")[1].strip()
                if 'noOfRxAntennas' not in dict_inter.keys():
                    dict_inter['noOfRxAntennas'] = ''
                if 'noOfTxAntennas' not in dict_inter.keys():
                    dict_inter['noOfTxAntennas'] = ''
                if 'noOfUsedRxAntennas' not in dict_inter.keys():
                    dict_inter['noOfUsedRxAntennas'] = ''
                if 'noOfUsedTxAntennas' not in dict_inter.keys():
                    dict_inter['noOfUsedTxAntennas'] = ''
                
        dict_inter["base_bande"] = base_bande_value           
        list_data_frame_5G.append(dict_inter)
                   
    #print(list_data_frame_5G)
    if('TDD'not in programme):
        for j in list_data_frame_5G:
            if(j['essScLocalId'] == '0'  and j['essScPairId'] == '0'):
                j.update({'Check_DSS_2' : "OK"})
            else:
                if("10" in j['essScPairId'] ):
                    essc = j['essScLocalId'] 
                    j.update({'essScLocalId': essc.replace("10", ""),'Check_DSS_2' : "OK"})
                else:
                    essc = j['essScLocalId'] 
                    j.update({'essScLocalId': essc.replace("10", ""),'Check_DSS_2' : "NOK"})
   
    return list_data_frame_5G               
    

def find_cosite_file_path(file_name,location_path, a_info_cell_sectors) :
    print('i m here')
    list_current_directory = [f for f in os.listdir("./")]
    location = os.getcwd() + '/files/files/Input_Log/'
    #print("list_current_directory : ", list_current_directory)
    print("location_path : ", location_path)
    dict_site_cosite = {}
    files =  []
    if file_name == '':
        #print('im here')
        #print("a_info_cell_sectors : ", a_info_cell_sectors)
        
        files = []
    else:
        #files = [i for i in os.listdir(location_path) if file_name in i and ".txt" in i]
        files = [i for i in os.listdir(location_path) if ".txt" in i]
        #if len(files) == 0:
            #files = [i for i in os.listdir(location_path) if file_name[1:] in i and ".txt" in i]
    print("files : ", files)
    print("file_name : ", file_name)
    #print("len file : ", len(files) )
    
    
    if len(files) > 0:
        dict_site_cosite['site'] =  '{}/{}'.format(location_path,file_name)
        file_cosite = files.copy()
        print("file_name : ", file_name)
        print("file_cosite : ", file_cosite)
        if(file_name in file_cosite):
            file_cosite.remove(file_name)
        if(len(file_cosite) == 0):
            dict_site_cosite['Cosite'] =  False
        else:
            dict_site_cosite['Cosite'] =  '{}/{}'.format(location_path,file_cosite[0])
        return dict_site_cosite
    else:
        dict_site_cosite['site'] =  False
        dict_site_cosite['Cosite'] =  False
        return dict_site_cosite





def info_licence(my_list, matchers, cell_sectors_mimo_check):
    mimo4x4_list = []
    for mimo4x4 in cell_sectors_mimo_check:
        if "4x4" in mimo4x4.replace(" ", "") or "0x4" in mimo4x4.replace(" ", "") or "2x4" in mimo4x4.replace(" ", ""):
            mimo4x4_list.append(mimo4x4)
    #print( mimo4x4_list)

    matching = [s for s in my_list if matchers not in s]
    if len(mimo4x4_list) > 0 and len(matching) > 0:
        return matching
    else:
        return []
    

def extract_cell_Site_Cosite(list_4G, text_file_path_cosite,list_data_frame_4G , date_creation, programme, Date_Ref, zone, bande_ligne):
    list_data_frame_cosite_4G = []
    if text_file_path_cosite != False:
        file = text_file_path_cosite.split("/")[-1]
        with open(text_file_path_cosite) as f1:
            info_cosite = read_block(f1, 'siteLocation','=================================================================================================================')
            f1.seek(0)
            info_cosite_cell = read_block(f1, 'eNBId:','#5G:')
            remove_equals(info_cosite_cell)
            f1.seek(0)
            eNBId = {}
            
            for li in info_cosite_cell:
                if('eNBId' in li):
                    eNBId [file.split("_")[2].split(".")[0].strip()]= li.split(":")[1]
            #print("cosite error : ", text_file_path_cosite)
            list_data_frame_cosite_4G = Extract_Data_Frame_4G(list_4G, text_file_path_cosite.split("/")[-1], {} , [],date_creation, programme, Date_Ref , zone, eNBId, bande_ligne, '')
                    
                    
        f1.close()
    list_data_frame_4G.extend(list_data_frame_cosite_4G)
    if [] in list_data_frame_4G :
        list_data_frame_4G.remove([])
    return list_data_frame_4G

def check_carte_3G(info_band_carte):
    #print(info_band_carte)
    info_band_carte_new = []
    j = 0
    dict_band_carte = {}
    check_carte_type= False
    band_3G =[]
    if(info_band_carte == []):
        dict_band_carte = {}
    else:
        for element in info_band_carte:
            info_band_carte_new.append(element.split(" "))
        for i in info_band_carte_new:
            band = []
            #print(i)
            j = j+1
            if( "B8" in "".join(i)):
                band.append("900")
            if("B20" in "".join(i)):
                band.append("800")
            if("B28" in "".join(i)):
                band.append("700")
                if('2460' in "".join(i)):
                    check_carte_type= True
            if("B3" in "".join(i)):
                band.append("1800")
            if("B7" in "".join(i)):
                band.append("2600")
            if("B1" in "".join(i)):
                band.append("2100")
        
            dict_band_carte["carte_"+ str(j)] = band
    #print("dict_band_carte: ", dict_band_carte)
       
    if(dict_band_carte == {}):
        return False, dict_band_carte, check_carte_type
    else:
        for element in dict_band_carte.keys():
            if("900" in dict_band_carte[element] and len(dict_band_carte[element]) > 1):
                band_3G.append(dict_band_carte[element])
                
        if(band_3G == []):
            return False, dict_band_carte, check_carte_type
        else:
            return True, dict_band_carte, check_carte_type

def Missing_RET_Check(dict_ret_state_finale, list_band_mimo_4G):
    test_cell = []
    for k in dict_ret_state_finale.keys():
        if dict_ret_state_finale[k] == False:
            for el in list_band_mimo_4G:
                if k in el.keys():
                    if(el[k] in ["2 x 2", "2 x 4", "4 x 2", "0 x 2", "2 x 0"]):
                        if k == "700":
                            test_cell.append('K MIMO '+ el[k].strip() +' : K1Sx')
                        elif k == "800":
                            test_cell.append('T MIMO '+ el[k].strip() +' : L1Sx')
                        elif k == "900":
                            test_cell.append('G MIMO 2x2 : G1Sx')
                        elif k == "2600":
                            test_cell.append('L MIMO '+ el[k].strip() +' : E1Sx')
                        elif k == "1800":
                            test_cell.append('D MIMO '+ el[k].strip() +' : D1Sx')
                        elif k == "2100":
                            test_cell.append('P MIMO '+ el[k].strip() +' : U1Sx')                    
                    elif (el[k] in ["4 x 4", "0 x 4", "4 x 0"]):
                        if k == "700":
                            test_cell.append('K MIMO '+ el[k].strip() +' : K2MSx & K1MSx')
                        elif k == "800":
                            test_cell.append('T MIMO 4x4 '+ el[k].strip() +' : L2MSx & L1MSx')
                        elif k == "900":
                            test_cell.append('G MIMO 4x4 '+ el[k].strip() +' : G2MSx & G1MSx')
                        elif k == "2600":
                            test_cell.append('L MIMO 4x4 '+ el[k].strip() +' : E2MSx & E1MSx')
                        elif k == "1800":
                            test_cell.append('D MIMO 4x4 '+ el[k].strip() +' : D2MSx & D1MSx')
                        elif k == "2100":
                            test_cell.append('P MIMO 4x4 '+ el[k].strip() +' : U2MSx & U1MSx')
        else:
            pass
    return test_cell



def parsing_data_for_csv_rules(data_form_csv_rules_file, name_antenna_list):
    
    good_list_of_rules = []
    if (' ' in name_antenna_list):
        name_antenna_list.remove(' ')
    #print(name_antenna_list)

    for i in data_form_csv_rules_file:
        for j in name_antenna_list:
            if j.lower() in i.lower():
                good_list_of_rules.append(i)
            elif "-" in j:
                if j.split("-")[0].lower() in i.lower():
                    good_list_of_rules.append(i)
            elif "_" in j:
                if j.split("_")[0].lower() in i.lower():
                    good_list_of_rules.append(i)
                
                  
    text_csv_rules_1vs = [x.split() for x in good_list_of_rules]
    text_csv_rules_2vs = [[chunk for chunks in map(lambda e: e.split(','), sub) for chunk in chunks if chunk] for sub in text_csv_rules_1vs]

    return text_csv_rules_2vs



def my_split(s):
    s_connectors = ["".join(x) for _, x in groupby(s, key=str.isdigit)]
    test = ''.join(s_connectors[-2:])
    return test

def check_values_mimo_ret_rules(list_rules, list_ret_connectors, letter_ret, number_mimo, ret_band):

    corect_list_of_rules = []
    

    for i in list_rules:
        if len(i) >= 5 and '1400' not in i[2]:
            corect_list_of_rules.append(i)


    ret_checked_list = []
    ret_rules_connector = []

    for j in list_ret_connectors:
        if number_mimo == '2':
            if j[3].startswith(letter_ret) and 'M' not in j[3] and (j[3].endswith('1') or j[3].endswith('2') or j[3].endswith('3')) and '0' not in j[3]:
                ret_checked_list.append(j)
        elif number_mimo == '4':
            if j[3].startswith(letter_ret) and 'M' in j[3] and (j[3].endswith('1') or j[3].endswith('2') or j[3].endswith('3')) and '0' not in j[3]:
                ret_checked_list.append(j)
        else:
            pass
    

    correct_values_found = []
    test_get_val_and_connector = []



    #extracting the connector for specific band and pars for the wrong one
    dict_band_connector = {}
    if len(ret_checked_list) != 0:
        if len(corect_list_of_rules) != 0:
            for ret_rull_con in corect_list_of_rules:
                list_inter = []
                if ret_band in ret_rull_con[2]:
                    #print("RET rules", ret_rull_con)
                    for ret in ret_checked_list:
                        #print("RULES", ret_rull_con[3])
                        #print("RET ",ret[-1])
                        #print()
                        #print("*********************8")
                        if ret_rull_con[3] in ret[-1]:
                            list_inter.append(ret[-1])
                            correct_values_found.append(ret)
                    dict_band_connector[ret_band] = list_inter
            wrong_values_in_ret_connectors = [item for item in ret_checked_list if item not in correct_values_found]
            #print("correct_values_found ",correct_values_found)
            #print()
            #print("wrong_values_in_ret_connectors ",wrong_values_in_ret_connectors)
            #print("dict_band_connector : ", dict_band_connector)
            #find goof connector from rules file for specific band RET
            def check_good_con(corect_list_of_rules, bandRET):
                good_conector_from_rules = []
                for j_rul in corect_list_of_rules:
                    if len(j_rul) >= 5:
                        if bandRET in j_rul[2]:
                            good_conector_from_rules.append(j_rul[3])
                return good_conector_from_rules




            for i_con in wrong_values_in_ret_connectors:
                if i_con[3].startswith('K'):
                    result_K = check_good_con(corect_list_of_rules, '700')
                    test_get_val_and_connector.append('700 is using')
                    test_get_val_and_connector.append(my_split(i_con[-1]))
                    test_get_val_and_connector.append(" Correct connector should be :")
                    test_get_val_and_connector.append(result_K)
                    test_get_val_and_connector.append("; ")                    


                if i_con[3].startswith('L'):
                    result_L = check_good_con(corect_list_of_rules, '800')
                    test_get_val_and_connector.append('800 is using')
                    test_get_val_and_connector.append(my_split(i_con[-1]))
                    test_get_val_and_connector.append(" Correct connector should be :")
                    test_get_val_and_connector.append(result_L)
                    test_get_val_and_connector.append("; ")

                if i_con[3].startswith('D'):
                    
                    result_D = check_good_con(corect_list_of_rules, '1800')

                    #print("result_D",result_D)

                    test_get_val_and_connector.append('1800 is using')
                    test_get_val_and_connector.append(my_split(i_con[-1]))
                    test_get_val_and_connector.append(" Correct connector should be :")
                    test_get_val_and_connector.append(result_D)
                    test_get_val_and_connector.append("; ")

                    #print("!!!!!!!!!!", test_get_val_and_connector)

                if i_con[3].startswith('U'):
                    result_U = check_good_con(corect_list_of_rules, '2100')
                    test_get_val_and_connector.append('2100 is using')
                    test_get_val_and_connector.append(my_split(i_con[-1]))
                    test_get_val_and_connector.append(" Correct connector should be :")
                    test_get_val_and_connector.append(result_U)
                    test_get_val_and_connector.append("; ")

                if i_con[3].startswith('E'):
                    result_E = check_good_con(corect_list_of_rules, '2600')
                    test_get_val_and_connector.append('2600 is using')
                    test_get_val_and_connector.append(my_split(i_con[-1]))
                    test_get_val_and_connector.append(" Correct connector should be :")
                    test_get_val_and_connector.append(result_E)
                    test_get_val_and_connector.append("; ")

                if i_con[3].startswith('G'):
                    result_G = check_good_con(corect_list_of_rules, '900')
                    test_get_val_and_connector.append('900 is using')
                    test_get_val_and_connector.append(my_split(i_con[-1]))
                    test_get_val_and_connector.append(" Correct connector should be :")
                    test_get_val_and_connector.append(result_G)
                    test_get_val_and_connector.append("; ")
            return test_get_val_and_connector
        else:
            return 'NO Rules'    
    else:
        return False

        



def check_MIMO_RET_RULES(list_of_MIMO , list_rules, list_ret_connectors):
    #print(list_rules)
    list_rules_new = []
    for el in list_rules:
        #print(el)
        if(len(el)==1):
            list_rules_new.append(el[0].split(";"))
        else:
            list_inter = []
            list_inter.append(''.join(el))
            list_rules_new.append(list_inter[0].split(";"))
    coherance_antenne = []        
    for i in list_rules_new:
        coherance_antenne.append(i[0])
    #print(list(set(coherance_antenne)))
    if(len(list(set(coherance_antenne))) == 1):
        for element in list_rules_new:
            if(element[3] in ["OUI", "NON"] and len(element) > 4):
                element3 = ""
                element4 = element[3]
                element5 =  element[4]
                element[3] = element3
                element[4] = element4
                element.append(element5)
            elif (element[3] in ["OUI", "NON"] and len(element)==4):
                element3 = ""
                element4 = element[3]
                element5 =  ""
                element.append(element4)
                element.append(element5)
            elif (len(element) == 5 and element[-1] in ["OUI", "NON"]):
                element.append(" ")
            
   
   
        if list_ret_connectors != False:
            info_ret_config_conectors_1vs = [[chunk for chunks in map(lambda e: e.split('='), sub) for chunk in chunks if chunk] for sub in list_ret_connectors]

            ret_result_MIMO2_E = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'E','2','2600')
            ret_result_MIMO4_E = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'E','4','2600')
            ret_result_MIMO2_D = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'D','2','1800')
            ret_result_MIMO4_D = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'D','4','1800')
            ret_result_MIMO2_L = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'L','2','800')
            ret_result_MIMO4_L = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'L','4','800')
            ret_result_MIMO2_U = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'U','2','2100')
            ret_result_MIMO4_U = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'U','4','2100')
            ret_result_MIMO2_K = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'K','2','700')
            ret_result_MIMO4_K = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'K','4','700')
            ret_result_MIMO2_G = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'G','2','900')
            ret_result_MIMO4_G = check_values_mimo_ret_rules(list_rules_new, info_ret_config_conectors_1vs,'G','4','900')

        total_wrong_values = [ret_result_MIMO2_E, ret_result_MIMO4_E, ret_result_MIMO2_D, ret_result_MIMO4_D, ret_result_MIMO2_L, ret_result_MIMO4_L, ret_result_MIMO2_U, ret_result_MIMO4_U, ret_result_MIMO2_K, ret_result_MIMO4_K,  ret_result_MIMO2_G, ret_result_MIMO4_G]
        total_wrong_values = [x for x in total_wrong_values if x != [] and x != False]
        total_wrong_values = [item for item in flatten(total_wrong_values)]

        #print("total_wrong_values", total_wrong_values)

        if not total_wrong_values:
            return ''
        else:
            if 'NO Rules' in total_wrong_values:
                return 'NO Rules' 
            else:
                total_wrong_values_2 = [' '.join([str(c) for c in lst]) for lst in total_wrong_values]
                total_wrong_values_3 = [i.replace(",", ' ') for i in total_wrong_values_2 ]

                return ' | '.join(total_wrong_values_3)
    else:
         return 'Antenne dupliquée' + ' | '.join(list(set(coherance_antenne)))  
        
        
def Insert_file(file_path, response, dict_dataset):
    workbook = xlsxwriter.Workbook(file_path)
    for el in dict_dataset.keys():
        worksheet = workbook.add_worksheet(el)
        dataset= dict_dataset[el]
        for col, head in enumerate(dataset.headers):
            worksheet.write(0, col, head)
        for row, lines in enumerate(dataset):
            for col, data in enumerate(lines):
                worksheet.write(row + 1, col, data)
    workbook.close()
    rb = open_workbook(file_path)
    wb = copy(rb)
    wb.save(response)
    
    
def ZiPPER_file(abs_file_path, date_creation):
    file_path_zip = "files/files/Input_Log/"+date_creation+"/"+'{}.zip'.format(date_creation)
    export_zip = ZipFile(os.path.join(BASE_DIR, file_path_zip), 'w')
    for file_zip in os.listdir(abs_file_path):
        #print(os.path.join(abs_file_path,file_zip))
        if(".zip" not in file_zip):
            export_zip.write(os.path.join(abs_file_path,file_zip), file_zip )
    export_zip.close()
    FRONTEND_DIR = os.path.join(str(BASE_DIR).replace('*_Backend', '*_Frontend'), "public/export/")
    shutil.move(os.path.join(BASE_DIR, file_path_zip), os.path.join(FRONTEND_DIR, '{}.zip'.format(date_creation)))
    filename ='{}.zip'.format(date_creation)
    return filename
    
    
    
def Extract_Data_Frame_2G(list_2G, file, date_creation, programme, Date_Ref, zone, bande_ligne, base_bande_value):
    print('im 2G')
    #print(bande_ligne)
    list_data_frame_2G =  []
    list_param = ["Tx" , "Rx" , "TsState" , "TsOper"]
    for el in list_2G:
        dict_inter = {}
        dict_inter["Date_Ref"] = Date_Ref
        dict_inter["Programme"] = programme
        dict_inter["date_insertion"] = date_creation
        if(".txt" in file.split("_")[2]):
            dict_inter["SiteName"] = file.split("_")[2].split(".")[0].strip()
        else:
            dict_inter["SiteName"] = file.split("_")[2].strip()
        dict_inter["cellname"] = el.split("|")[0].split(":")[0].split("/")[0].strip()
        dict_inter["zone"] = zone.strip()
        if(dict_inter["cellname"].startswith('C')):
            dict_inter["ProductName"] = bande_ligne['900']
        if(dict_inter["cellname"].startswith('B')):
            dict_inter["ProductName"] = bande_ligne['1800']
        dict_inter[el.split("|")[0].split(":")[0].split("/")[1].split(" ")[1]] = el.split("|")[0].split(":")[0].split("/")[1].split(" ")[2].strip()
        dict_inter["TRX"] = el.split("|")[0].split(":")[0].split("/")[-1].strip()
        dict_inter[el.split("|")[0].split(":")[1].split("=")[0].strip()] = el.split("|")[0].split(":")[1].split("=")[1].strip()
        for j in el.split("|")[1:]:
            if('x' in j and 'configuredMaxTxPower' not in j and 'qRxLevMin' not in j and "Tx" not in j):
                for k in range(0,len(j.split("=")[0].split("x"))):
                    dict_inter[j.split("=")[0].split("x")[k].strip()] = j.split("=")[1].split("x")[k].strip()
            else:
                if( "noOfRxAntennas x noOfTxAntennas" in j):
                    dict_inter['noOfRxAntennas'] = j.split("=")[1].split("x")[0].strip()
                    dict_inter['noOfTxAntennas'] = j.split("=")[1].split("x")[1].strip()
                else:
                    dict_inter[j.split("=")[0].strip()] = j.split("=")[1].strip()
                if 'noOfRxAntennas' not in dict_inter.keys():
                    dict_inter['noOfRxAntennas'] = ''
                if 'noOfTxAntennas' not in dict_inter.keys():
                    dict_inter['noOfTxAntennas'] = ''
            if(j.split("=")[0].strip() == 'Statut Tx x Rx x TsState x TsOper'):
                dict_inter[j.split("=")[0].strip()] = j.split("=")[1]+ " = "+ j.split("=")[2].strip()
        partie_1 = []
        partie_1 = el.split("|")[1].split("=")[1].split("x")[:-1]
        partie_2 = " = ".join([el.split("|")[1].split("=")[1].split("x")[-1], el.split("|")[1].split("=")[2].split("x")[0]])
        partie_1.append(partie_2)
        if("TsOper" not in el):
            partie_1.append("")
        else:
            partie_3 = " = ".join([el.split("|")[1].split("=")[2].split("x")[-1] , el.split("|")[1].split("=")[3].split("x")[0]])
            partie_1.append(partie_3)
        print("fin 2G avant")
        list_param_final = []
        for k in list(zip(list_param , partie_1)):
            #print(k)
            dict_inter[list(k)[0]] = list(k)[1]
        if(dict_inter['TsState'].count("ENABLED") == 8 and dict_inter['TsState'] != ''):
            dict_inter['Check_TsState'] = 'OK'
        elif dict_inter['TsState'] == '':
            dict_inter['Check_TsState'] = 'NA'
        else:
            dict_inter['Check_TsState'] = 'NOK'
        if(dict_inter['TsOper'].count("OPERATIONAL") == 8 and dict_inter['TsOper'] != ''):
            dict_inter['Check_TsOper'] = 'OK'
        elif dict_inter['TsOper'] == '':
            dict_inter['Check_TsOper'] = 'NA'
        else:
            dict_inter['Check_TsOper'] = 'NOK'
        print(dict_inter['Tx'].split())
        if len(dict_inter['Tx'].split()) != 0:
            dict_inter['Tx'] = dict_inter['Tx'].split()[0]
        else:
            dict_inter['Tx'] = ''
        dict_inter["base_bande"] = base_bande_value
        if len(dict_inter['Rx'].split()) != 0:
            dict_inter['Rx'] = dict_inter['Rx'].split()[0]
        else:
            dict_inter['Rx'] = ''
        list_data_frame_2G.append(dict_inter)
    print("fin 2G")
    return list_data_frame_2G
    
    
    
def Extract_Data_Frame_3G(list_3G, file, date_creation, programme, Date_Ref, zone, bande_ligne, base_bande_value):
    print('im 3G')
    list_data_frame_3G =  []
    for el in list_3G:
        #print(el.split("|"))
        dict_inter = {}
        dict_inter["Date_Ref"] = Date_Ref
        dict_inter["Programme"] = programme
        dict_inter["date_insertion"] = date_creation
        if(".txt" in file.split("_")[2]):
            dict_inter["SiteName"] = file.split("_")[2].split(".")[0].strip()
        else:
            dict_inter["SiteName"] = file.split("_")[2]
        dict_inter["cellname"] = el.split("|")[0].split(":")[0].split("/")[0].strip()
        dict_inter["zone"] = zone.strip()
        dict_inter[el.split("|")[0].split(":")[0].split("/")[1].split(" ")[1]] = el.split("|")[0].split(":")[0].split("/")[1].split(" ")[2].strip()
        dict_inter[el.split("|")[0].split(":")[1].split("=")[0].strip()] = el.split("|")[0].split(":")[1].split("=")[1].strip()
        if(dict_inter["userLabel"].startswith('G')):
            dict_inter["ProductName"] = bande_ligne["900"]
        if(dict_inter["userLabel"].startswith('U')):
            dict_inter["ProductName"] = bande_ligne["2100"]
        if(dict_inter["userLabel"].startswith('V')):
            dict_inter["ProductName"] = bande_ligne["2100"]
        if(dict_inter["userLabel"].startswith('W')):
            dict_inter["ProductName"] = bande_ligne["2100"]
        
        for j in el.split("|")[1:]:
            if('x' in j and 'configuredMaxTxPower' not in j and 'qRxLevMin' not in j and "Tx" not in j):
                for k in range(0,len(j.split("=")[0].split("x"))):
                    dict_inter[j.split("=")[0].split("x")[k].strip()] = j.split("=")[1].split("x")[k].strip()
            else:
                if( "numOfRxAntennas x numOfTxAntennas" in j):
                    dict_inter['numOfRxAntennas'] = j.split("=")[1].split("x")[0].strip()
                    dict_inter['numOfTxAntennas'] = j.split("=")[1].split("x")[1].strip()
                else:
                    dict_inter[j.split("=")[0].strip()] = j.split("=")[1].strip()
                if 'numOfRxAntennas' not in dict_inter.keys():
                    dict_inter['numOfRxAntennas'] = ''
                if 'numOfTxAntennas' not in dict_inter.keys():
                    dict_inter['numOfTxAntennas'] = ''
                    
        dict_inter["base_bande"] = base_bande_value
        list_data_frame_3G.append(dict_inter)
    return list_data_frame_3G




def check_auportref_rfportref(dict_RRU_N):
    
    #print('dict_RRU_N : ', dict_RRU_N)
    
    regle_1 = [['RfBranch=1', 'AuPort=1', 'RfPort=A'],
               ['RfBranch=2', 'AuPort=2', 'RfPort=B']]
    regle_2 = [['RfBranch=1', 'AuPort=1', 'RfPort=A'], ['RfBranch=2', 'AuPort=3', 'RfPort=C'], ['RfBranch=3', 'AuPort=2', 'RfPort=B'], ['RfBranch=4', 'AuPort=4', 'RfPort=D']]
    regle_5 = [['RfBranch=1', 'AuPort=1', 'RfPort=A'], ['RfBranch=2', 'AuPort=2', 'RfPort=C'], ['RfBranch=3', 'AuPort=3', 'RfPort=B'], ['RfBranch=4', 'AuPort=4', 'RfPort=D']]
    regle_3 = [['RfBranch=1', 'AuPort=1', 'RfPort=A'], ['RfBranch=2', 'AuPort=3', 'RfPort=A'], ['RfBranch=3', 'AuPort=2', 'RfPort=B'], ['RfBranch=4', 'AuPort=4', 'RfPort=B']]
    regle_4 = [['RfBranch=1', 'AuPort=1', 'RfPort=A'],['RfBranch=2', 'AuPort=2', 'RfPort=A']]
    regle_6 = [['RfBranch=1', 'AuPort=1', 'RfPort=A'], ['RfBranch=2', 'AuPort=3', 'RfPort=B'], ['RfBranch=3', 'AuPort=2', 'RfPort=C'], ['RfBranch=4', 'AuPort=4', 'RfPort=D']]
    result_NOK = []
    result_OK = []
    #print(dict_RRU_N)
    for cles in dict_RRU_N:
        if(dict_RRU_N[cles][0][1] == 2 and len(dict_RRU_N[cles][0]) == 2):
            if (dict_RRU_N[cles][1] == regle_1):
                result_OK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(
                    ",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
            else:
                result_NOK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(
                    ",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
        elif (dict_RRU_N[cles][0][1] == 4 and len(dict_RRU_N[cles][0]) == 2):
            if (dict_RRU_N[cles][1] == regle_2 or dict_RRU_N[cles][1] == regle_5 or dict_RRU_N[cles][1] == regle_6):
                result_OK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(
                    ",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
            else:
                result_NOK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(
                    ",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
        elif (dict_RRU_N[cles][0][1] == 1 and len(dict_RRU_N[cles][0]) == 4):
            if (dict_RRU_N[cles][1] == regle_4):
                result_OK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(
                    ",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
            else:
                result_NOK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(
                    ",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
        else:
            #print(dict_RRU_N[cles])
            if len(dict_RRU_N[cles]) > 1 : 
                if (dict_RRU_N[cles][1] == regle_3):
                    result_OK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
                else:
                    result_NOK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(",", "|") + " " + str(dict_RRU_N[cles][1]).replace(",", "|"))
            else:
                result_NOK.append(cles + " : " + str(dict_RRU_N[cles][0]).replace(",", "|") + " info manquante de RRU" )
    if (result_NOK == []):
        return "", 'OK'
    else:
        return '>>>'.join(result_NOK), 'NOK'
    
    
    

    
def extract_rfbranch_rfport(rfbranch_rfport_text_block):
    dict_RRU = {}
    dict_RRU_N = {}
    for element in [element.split(",") for element in rfbranch_rfport_text_block]:
        RRU_value = ""
        for text in element:
            if "FieldReplaceableUnit" in text:
                RRU_value = text.split("=")[-1]
        #print(RRU_value)
        #print(element)
        #print(element[4].split("=")[2])
        #print(element[4].replace(" ", "")[29:])
        dict_RRU.setdefault(element[0], []).append(
           RRU_value)
    for element in dict_RRU:
        for i in dict_RRU[element]:
            if (dict_RRU[element].count(i) == len(dict_RRU[element])):
                dict_RRU_N.setdefault(element, []).append(
                    [dict_RRU[element][0], len(dict_RRU[element])])
                break
            elif (dict_RRU[element].count(i) == int(len(dict_RRU[element])/2)):
                dict_RRU_N.setdefault(element, []).append([dict_RRU[element][0], int(
                    len(dict_RRU[element])/2), dict_RRU[element][1], int(len(dict_RRU[element])/2)])
                break

    for cles in dict_RRU:
        result = []
        for x in [element.split(",") for element in rfbranch_rfport_text_block]:
            #print(x)
            if(x[0] == cles):
                if("AuPort" in x[4]):
                    #print([x[1][0:10], x[4][0:8], x[-1]])
                    result.append([x[1][0:10], x[4][0:8], x[-1]])
                else :
                    #print([x[1][0:10], "" , x[-1]])
                    result.append([x[1][0:10], "", x[-1]])
        dict_RRU_N.setdefault(cles, []).append(result)
    return dict_RRU_N
