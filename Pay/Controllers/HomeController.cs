﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pay.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Pay()
        {
            var order = new OrderDTO()
            {

            };
            ViewBag.Order = order;

            return View();
        }

        public ActionResult Thanks()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}