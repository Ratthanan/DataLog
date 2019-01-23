package com.iiot.voltage.service.impl;

import com.iiot.voltage.security.CustomUser;
import com.iiot.voltage.security.CustomUserModel;
import com.iiot.voltage.service.UserAuthorizationService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.ServletContext;
import java.math.BigDecimal;
import java.util.*;

@Service
public class UserAuthorizationServiceImpl implements UserAuthorizationService {

	static final Logger LOGGER = LoggerFactory.getLogger(UserAuthorizationServiceImpl.class);
	
	@Autowired
	CustomUserModel customUserModel;
	
	@Autowired
    private ServletContext servletContext;
	
	@Autowired
	private  LocaleResolver localeResolver;
	
	/* For case Special Authentication */
	public Object getUserDetail(String username) {
//
//		HttpHeaders headers = new HttpHeaders();
//        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
//        headers.add("Content-Type", "application/json; charset=utf-8");
//        headers.add("userName",     username);
//        customUserModel.addValue("userName", username);
//
//        /* Find User */
//        HttpEntity<String> entity = new HttpEntity<String>("", headers);
//        String url = "/users/search/findByUsername?username="+username;
//        String json = restTemplate.exchange(EngineServer+url, HttpMethod.GET, entity, String.class).getBody();
//
//        String idStr = "";
//        String roleName = "";
//        Map userMap = gson.fromJson(json, Map.class);
//        List<Map> authorities =  (List<Map>) userMap.get("authorities");
//        if(authorities!=null){
//        	/* Stream List odf role */
//        	for(Map role:authorities){
//        		BigDecimal id = new BigDecimal(String.valueOf(role.get("id")));
//        		idStr = idStr+","+id.intValue();
//        		roleName = roleName + "," + String.valueOf(role.get("role"));
//        	}
//
//        	/* Get Language support of Parameter */
//        	ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//        	String langSession = localeResolver.resolveLocale(attr.getRequest()).toString();
//        	attr.getRequest().getSession(true).setAttribute("MENU_LANG",langSession);
//
//        	String jsonParameter = restTemplate.exchange(EngineServer+"/parameterDetails/search/findByParameterCodeIn?parameter="+ApplicationConstant.PARAMETER_LANGUAGE, HttpMethod.GET, entity, String.class).getBody();
//	       	 Map parameterMap = gson.fromJson(jsonParameter, Map.class);
//	       	 List<Map> contentsParameter =  (List<Map>) parameterMap.get("content");
//	       	 customUserModel.addValue("PARAMETER_LANGUAGE", contentsParameter);
//	       	 customUserModel.addValue("PARAMETER_LANGUAGE_JSON", gson.toJson(contentsParameter));
//
//
//
//	       	/*Find Menu by role*/
//        	 String method = "findByCodeIgnoreCaseContainingAndNameIgnoreCaseContainingAndRolesIn";
//             String urlMenu = "/menus/search/"+method+"?size=10000&sort=parent,asc&sort=sequence,asc&code=&name=&roles="+idStr.substring(1);
//
//
//             String jsonMenu = restTemplate.exchange(EngineServer+urlMenu, HttpMethod.GET, entity, String.class).getBody();
//
//             Map userMenu = gson.fromJson(jsonMenu, Map.class);
//             List<Map> contents =  (List<Map>) userMenu.get("content");
//
//             /* Prepare Max Sequence of Menu parent */
//             Map<Integer,Long> maxSequenceMap = new HashMap();
//             for(Map menu:contents){
//            	 Long maxSequence = maxSequenceMap.get(NumberUtil.toInteger(String.valueOf(menu.get("parent"))));
//            	 if(maxSequence==null){
//            		 Long sequence = NumberUtil.toLong(String.valueOf(menu.get("sequence"))) ;
//            		 maxSequenceMap.put(NumberUtil.toInteger(String.valueOf(menu.get("parent"))),sequence );
//            	 }else{
//            		 Long sequence = NumberUtil.toLong(String.valueOf(menu.get("sequence")));
//            		 if(sequence.compareTo(maxSequence) > 0){
//            			 maxSequenceMap.put(NumberUtil.toInteger(String.valueOf(menu.get("parent"))),sequence );
//            		 }
//            	 }
//             }
//             attr.getRequest().getSession(true).setAttribute("MENU_MAX_SEQUENCE",maxSequenceMap);
//             attr.getRequest().getSession(true).setAttribute("ROLES",idStr.substring(1));
//             attr.getRequest().getSession(true).setAttribute("USER_ID",String.valueOf(userMap.get("id")));
//             attr.getRequest().getSession(true).setAttribute("ROLE_NAME",roleName.substring(1));
//
//
//
//
//             int indexLang = 1;
// 	       	 if(contentsParameter !=null ) for(int i=0;i<contentsParameter.size();i++){
// 	       		String langParam = String.valueOf(contentsParameter.get(i).get("variable3"));
//
// 	       		indexLang = i + 1;
// 	       		if(langSession.indexOf(langParam) >= 0){
// 	       		    /* Set Menu */
// 	       		    customUserModel.addValue("MENU", genMenu(contents,indexLang,false));
// 	       		}
// 	       	    attr.getRequest().getSession(true).setAttribute("MENU_"+langParam,genMenu(contents,indexLang,false));
// 	       	    attr.getRequest().getSession(true).setAttribute("MENU_EDIT_"+langParam,genMenu(contents,indexLang,true));
// 	       	 }
//
//
//
//
//             /* Set Image*/
//        	 BigDecimal userId = new BigDecimal(String.valueOf(userMap.get("id")));
//        	 String srcImage = loadImage(userId.longValue());
//        	 if(!"".equals(srcImage)){
//        		 customUserModel.addValue("IMG_SRC", loadImage(userId.longValue()));
//        	 }else{
//        		 customUserModel.addValue("IMG_SRC", loadDefaultImage());
//        	 }
//
//         	/* Set User */
//			String firstName = String.valueOf(userMap.get("firstName"));
//			String lastName = String.valueOf(userMap.get("lastName"));
//			customUserModel.addValue("FIRST_NAME",firstName);
//			customUserModel.addValue("LAST_NAME",lastName);
//
//			/* Set Company */
//			Map employee = (Map) userMap.get("employees");
//			Map company = null;
//			if(null != employee){
//				company = (Map) employee.get("companys");
//			}
//			if(null != company){
//				customUserModel.addValue("COMPANY_CODE", company.get("code").toString());
//			}
//        }
//
//
//        /* Set Role by Stream*/
//        CustomUser userTmp = gson.fromJson(json, CustomUser.class);
//
        
        
        return null;
	}

	@Override
	public ResponseEntity<String> save(Map parameter) {
		return null;
	}

	@Override
	public ResponseEntity<String> putRole(Long id, List<String> associateIdLs) {
		return null;
	}

	@Override
	public ResponseEntity<String> findRoleByRoleName(String roleName) {
		return null;
	}


	private String loadDefaultImage() {

		return null;
	}
	
	private String loadImage(Long id) {

		return null;
	}
	
	private String genMenu(List<Map> contents,int indexLang,boolean flagEdit){
		Map menuAuthorize = new HashMap();
        StringBuffer sb = null;
        StringBuilder menuHtml = new StringBuilder();
        if(contents!=null){
       	 Map menuMap = new HashMap();
       	 for(Map menu:contents){
       		 sb = new StringBuffer();
       		 if("true".equals(String.valueOf(menu.get("flagHasChild")))){
       			 sb.append("<li class='icon icon-arrow-left'>");
       		 }else{
       			 sb.append("<li>");
       		 }
       		 
       		 menuAuthorize.put(String.valueOf(menu.get("programPath")), "true");
       		String urlLink = String.valueOf(menu.get("urlLink"));
       		String fullUrlLink = servletContext.getContextPath()+String.valueOf(menu.get("urlLink"));
       		if(urlLink.startsWith("http")){
       			fullUrlLink = urlLink;
       		}
       		
       		if("null".equals(urlLink)){
       			if(flagEdit){
           			sb.append("<a class='"+String.valueOf(menu.get("icon"))+"'  ><span style='margin-right: 10px;' onclick=\"loadUrl('"+fullUrlLink+"')\" >"+String.valueOf(menu.get("nameLang"+indexLang))+"</span><jsp:text /><span class='fa fa-pencil-square-o ' onclick=\"loadPopupEditMenu('"+String.valueOf(menu.get("nameLang"+indexLang))+"',"+String.valueOf(menu.get("id"))+")\" ><jsp:text /></span></a>");
              	 }else{
              		sb.append("<a class='"+String.valueOf(menu.get("icon"))+"'    >"+String.valueOf(menu.get("nameLang"+indexLang))+"</a>");
               	 }
       		 }else{
       			if(flagEdit){
           			sb.append("<a class='"+String.valueOf(menu.get("icon"))+"'  ><span style='margin-right: 10px;' onclick=\"loadUrl('"+fullUrlLink+"')\" >"+String.valueOf(menu.get("nameLang"+indexLang))+"</span><jsp:text /><span class='fa fa-pencil-square-o ' onclick=\"loadPopupEditMenu('"+String.valueOf(menu.get("nameLang"+indexLang))+"',"+String.valueOf(menu.get("id"))+")\" ><jsp:text /></span></a>");
              	 }else{
              		sb.append("<a class='"+String.valueOf(menu.get("icon"))+"'  onclick=\"loadUrl('"+fullUrlLink+"')\"   >"+String.valueOf(menu.get("nameLang"+indexLang))+"</a>");//href='"+servletContext.getContextPath()+String.valueOf(menu.get("urlLink"))+"'
               	 }
       		 }
       		 
       		 if("true".equals(String.valueOf(menu.get("flagHasChild")))){
       			 sb.append("<div class='scroller mp-level'  >");
       			 sb.append("<h3 class='"+String.valueOf(menu.get("icon"))+"'>"+String.valueOf(menu.get("nameLang"+indexLang))+"</h3>");
       			 sb.append("<a class='mp-back' href='#'  >back</a>");
       			 sb.append("<ul>");
       			 sb.append("<p id='menu_"+String.valueOf(menu.get("id"))+"' />");
                    sb.append("</ul>");
       			 sb.append("</div>");
       		 }
       		 
       		 sb.append("</li>");
       		 
       		 if(menuHtml.toString().indexOf("<p id='menu_"+String.valueOf(menu.get("parent"))+"' />") >=0){
       			 String html = menuHtml.toString().replaceFirst("<p id='menu_"+String.valueOf(menu.get("parent"))+"' />", sb.toString()+"<p id='menu_"+String.valueOf(menu.get("parent"))+"' />");
       			 menuHtml = new StringBuilder(html);
       		 }else{
       			 menuHtml.append(sb);
       		 }
       		 
       		 
       	 }
        }  

   	    customUserModel.addValue("MENU_AUTHORIZE", menuAuthorize);
        return menuHtml.toString();
	}
	

//	@Override
//	@Autowired
//	public void setRestTemplate(RestTemplate restTemplate) {
//
//		super.restTemplate = restTemplate;
//	}
//	@Override
//	public ResponseEntity<String> save(Map parameter) {
//
//		String url = "/users";
//		return postWithJson(parameter, HttpMethod.POST, url);
//	}
//	@Override
//	public ResponseEntity<String> putRole(Long id,List<String> associateIdLs) {
//
//		String url = "/users/"+id;
//		String associatePath = "/roles";
//		return putAssociate(associateIdLs,url,associatePath);
//	}
//
//
//
//	@Override
//	public ResponseEntity<String> findRoleByRoleName(String roleName) {
//
//		HttpHeaders headers = new HttpHeaders();
//		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
//        headers.add("Content-Type", "application/json; charset=utf-8");
//
//        HttpEntity<String> entity = new HttpEntity<String>("", headers);
//        String method = "findByRoleName";
//        String url = "/roles/search/"+method+"?roleName="+roleName;
//        return getResultString(url,entity);
//	}

}
