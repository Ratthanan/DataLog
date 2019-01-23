package com.iiot.voltage.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Configurable
public class UrlAuthorizationInteceptor extends HandlerInterceptorAdapter {

    static final Logger LOGGER = LoggerFactory.getLogger(UrlAuthorizationInteceptor.class);

    

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean flagAccessDenied = false;
        String requestUrl = "";
        try {
            requestUrl = request.getRequestURI().replaceFirst(request.getContextPath(), "") + "/";
            if (!requestUrl.startsWith("/")) {
                requestUrl += "/";
            }

            requestUrl = requestUrl.substring(requestUrl.indexOf("/") + 1, requestUrl.indexOf("/", requestUrl.indexOf("/") + 1));
            Map menu_authorize = (Map) request.getSession().getAttribute("menu_authorize");
            if (requestUrl.trim().length() > 0 && menu_authorize.get(requestUrl) == null ) {
                response.sendRedirect(request.getContextPath() + "/Access_Denied");
                flagAccessDenied = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (!flagAccessDenied) {
            //Re render menu by lang
            String langSession = RequestContextUtils.getLocaleResolver(request).resolveLocale(request).toString();
            String menuLang = String.valueOf(request.getSession(true).getAttribute("MENU_LANG"));
            if ("menus".equals(requestUrl)) {
                String shortLang = String.valueOf(langSession.split("_")[0]);
                request.getSession(true).setAttribute("menu", String.valueOf(request.getSession(true).getAttribute("MENU_EDIT_" + shortLang)));
                request.getSession(true).setAttribute("MENU_LANG", langSession);
            } else {
                //if(!menuLang.equals(langSession)){ }
                String shortLang = String.valueOf(langSession.split("_")[0]);
                request.getSession(true).setAttribute("menu", String.valueOf(request.getSession(true).getAttribute("MENU_" + shortLang)));
                request.getSession(true).setAttribute("MENU_LANG", langSession);

            }
        }

        return true;
    }

}
