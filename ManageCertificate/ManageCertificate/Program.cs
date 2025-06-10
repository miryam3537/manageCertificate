using DAL;
using Microsoft.EntityFrameworkCore;
using BL;
using NLog.Web;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using ManageCertificate;
using DAL.Interfaces;
using BL.Interfaces;
using Entites;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
//    });
builder.Services.AddAuthentication(Microsoft.AspNetCore.Server.IISIntegration.IISDefaults.AuthenticationScheme);
builder.Services.AddDbContext<DatotDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SchooleConnection")));
builder.Services.AddScoped<IRefDAL, RefDAL>();
builder.Services.AddScoped<IRefBL, RefBL>();
builder.Services.AddScoped<IRequestDAl, RequestDAl>();
builder.Services.AddScoped<IRequestBL, RequestBL>();
builder.Services.AddScoped<ICertificateDAL, CertificateDAL>();
builder.Services.AddScoped<IEmailBL, EmailBL>();
builder.Services.AddScoped<ICouncilDAL, CouncilDAL>();
builder.Services.AddScoped<ICouncilBL, CouncilBL>();
builder.Services.AddScoped<IUserDAL, UserDAL>();
builder.Services.AddScoped<IUserBL, UserBL>();
builder.Services.AddScoped<IOfficeInventoryDAL, OfficeInventoryDAL>();
builder.Services.AddScoped<IOfficeInventoryBL, OfficeInventoryBL>();
// Add services to the container.
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Host.UseNLog();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
  

var app = builder.Build();
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseSpa(spa =>

{
    if (app.Environment.IsDevelopment())
    {
        //spa.UseAngularCliServer(npmScript: "start");
        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");

    }

});
app.UseErrorHandlingMiddleware();

app.UseHttpsRedirection();


//Scaffold - DbContext "Server=srv2\Teachers;Database=DatotDB;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer - OutputDir Models - Tables NewTableName - Force




app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
