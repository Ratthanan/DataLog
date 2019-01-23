package com.iiot.voltage.security;

import com.google.gson.*;
import com.iiot.voltage.service.UserAuthorizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.web.client.HttpClientErrorException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler{

	JsonDeserializer<Date> deser = new JsonDeserializer<Date>() {
        public Date deserialize(JsonElement json, Type typeOfT,
                                JsonDeserializationContext context) throws JsonParseException {
            return json == null ? null : new Date(json.getAsLong());
        }
    };

    protected Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm").registerTypeAdapter(Date.class, deser).create();



	static Logger LOGGER = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

    private RequestCache requestCache = new HttpSessionRequestCache();

    @Autowired
	CustomUserModel customUserModel;

    @Autowired
	UserAuthorizationService userAuthorizationService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
                                        throws ServletException, IOException {
    	String userName = authentication.getName().toLowerCase();

    	CustomUser user = null;
		LOGGER.info("User A : "+userName);
		try {
			user = (CustomUser) userAuthorizationService.getUserDetail(userName);
		} catch (HttpClientErrorException e) {
			LOGGER.info("No user with username '" + userName + "' found!");
			//Create User in DB
			String userResultString = userAuthorizationService.save(new HashMap(){{
				put("username",new String[]{userName});
				put("firstName",new String[]{""});
				put("lastName",new String[]{""});
				put("fullName",new String[]{""});
				put("description",new String[]{""});
				put("email",new String[]{""});
				put("accessToken",new String[]{"d84a4c0d8c95a0a17731194d28ac407f"});
				put("accountNonExpired",new String[]{"true"});
				put("credentialsNonExpired",new String[]{"true"});
				put("accountNonLocked",new String[]{"true"});
			}}).getBody();
			Map userMap = gson.fromJson(userResultString, Map.class);
			Long userId = ((Double) userMap.get("id")).longValue();


			String roleResultString = userAuthorizationService.findRoleByRoleName("USER").getBody();
			Map roleMap = gson.fromJson(roleResultString, Map.class);
			String rowId = ((Double) roleMap.get("id")).longValue()+"";
			userAuthorizationService.putRole(userId, Arrays.asList(rowId.split(",")));

			user = (CustomUser) userAuthorizationService.getUserDetail(userName);
		}


		if(user!=null){

			/* Support Detect for Tomcat Attribute */
			request.getSession(true).setAttribute("userName",userName);
//			request.getSession(true).setAttribute("userAgent",request.getHeader("User-Agent"));
//			request.getSession(true).setAttribute("screen_width",String.valueOf(request.getParameter("screen_width")));
//			request.getSession(true).setAttribute("screen_height",String.valueOf(request.getParameter("screen_height")));
//			request.getSession(true).setAttribute("menu",customUserModel.getValue("MENU"));
//			request.getSession(true).setAttribute("menu_authorize",customUserModel.getValue("MENU_AUTHORIZE"));
//			request.getSession(true).setAttribute("img_src",customUserModel.getValue("IMG_SRC"));
//			request.getSession(true).setAttribute("PARAMETER_LANGUAGE",customUserModel.getValue("PARAMETER_LANGUAGE"));
//			request.getSession(true).setAttribute("PARAMETER_LANGUAGE_JSON",customUserModel.getValue("PARAMETER_LANGUAGE_JSON"));
//			request.getSession(true).setAttribute("first_name",customUserModel.getValue("FIRST_NAME"));
//			request.getSession(true).setAttribute("last_name",customUserModel.getValue("LAST_NAME"));
//			request.getSession(true).setAttribute("companyCode",customUserModel.getValue("COMPANY_CODE"));




	        /* Add to Bean SESSION SCOPE */
	        customUserModel.addValue(CustomUserModel.ATTR_CUSTOM_USER, user);
	        customUserModel.addValue(CustomUserModel.ATTR_CUSTOM_USER_NAME, userName);

	        if(user.getAccessToken()==null){
	        	user.setAccessToken("");
	        }
	        LOGGER.info("session : "+request.getSession().getId());
	    }



        SavedRequest savedRequest = requestCache.getRequest(request, response);



        if (savedRequest == null) {
        	LOGGER.info("case 1");
            super.onAuthenticationSuccess(request, response, authentication);

            return;
        }

        String targetUrl = savedRequest.getRedirectUrl();
        LOGGER.info("Redirecting to DefaultSavedRequest Url: " + targetUrl);

        if (!targetUrl.contains("resource") && !targetUrl.contains("spring_security") && !targetUrl.contains("login") && !targetUrl.contains("logout")){
        	getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }else{
        	getRedirectStrategy().sendRedirect(request, response, "/");
        }
    }
}
