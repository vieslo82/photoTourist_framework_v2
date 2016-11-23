<body>
	<!--header-->
	<div class="header-top" id="home">
		<div class="container">
			<div class="head">
				<div class="header-left">
					<div class="logo">
						<a href="index.php?module=main"><img src="<?php echo IMG_PATH ?>/logo.png" alt="" /></a>
					</div>
				</div>
				<div class="header-right">
					<p>+11 235 813 2134</p>
				</div>
				<div class="clearfix"> </div>
				<div class="top-nav">
						<div class="nav-icon">
							<a href="#" class="right_bt" id="activator"><span> </span> </a>
						</div>
						 <div class="box" id="box">
							 <div class="box_content">
								<div class="box_content_center">
								 	<div class="form_content">
										<div class="menu_box_list">
											<ul>
												<!--PREGUNTAR: Aqui iria la función BEGIN-->

												<!--<li><a href="index.php?module=main" class="active"><span>Home</span></a></li>-->
												<li><a href="<?php amigable('?module=main'); ?>" class="active"><span>Home</span></a></li>

												<!--<li><a href="index.php?module=users&function=form_users"><span>Users</span></a></li>-->
												<li><a href="<?php amigable('?module=users&function=form_users'); ?>"><span>Users</span></a></li>

												<li><a href="careers.html"><span>Careers</span></a></li>
												<li><a href="404.html"><span>Help</span></a></li>
												<li><a href="blog.html"><span>Blog</span></a></li>
												<li><a href="contact.html"><span>Contact</span></a></li>
												<div class="clearfix"> </div>
											</ul>
										</div>
										<a class="boxclose" id="boxclose"> <span> </span></a>
									</div>
								</div>
							</div>
						</div>
					<!---start-click-drop-down-menu----->
			        <!----start-dropdown--->
			         <script type="text/javascript">
						var $ = jQuery.noConflict();
							$(function() {
								$('#activator').click(function(){
									$('#box').animate({'top':'0px'},900);
								});
								$('#boxclose').click(function(){
								$('#box').animate({'top':'-1000px'},900);
								});
							});
							$(document).ready(function(){
							//Hide (Collapse) the toggle containers on load
							$(".toggle_container").hide();
							//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
							$(".trigger").click(function(){
								$(this).toggleClass("active").next().slideToggle("500");
									return false; //Prevent the browser jump to the link anchor
							});

						});
					</script>
					<!---//End-click-drop-down-menu----->
					<!--top-nav---->
				</div>
				<div id="sb-search" class="sb-search">
						<form>
							<input class="sb-search-input" placeholder="Enter your search term..." type="search" name="search" id="search">
							<input class="sb-search-submit" type="submit" value="">
							<span class="sb-icon-search"> </span>
						</form>
					</div>
			</div>
		</div>
	</div>
	<!--//header-->
	<!--search-scripts-->
	<script src="<?php echo JS_PATH ?>uisearch.js"></script>
	<script src="<?php echo JS_PATH ?>classie.js"></script>
		<script>
			new UISearch( document.getElementById( 'sb-search' ) );
		</script>
	<!--//search-scripts-->
