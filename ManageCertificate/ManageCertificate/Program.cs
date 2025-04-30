using DAL;
using Microsoft.EntityFrameworkCore;
using BL;
using NLog.Web;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using ManageCertificate;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatotDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SchooleConnection")));

builder.Services.AddScoped<IRequestDAl, RequestDAl>();
builder.Services.AddScoped<IRequestBL, RequestBL>();
builder.Services.AddScoped<IRequestBL, RequestBL>();
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




app.UseAuthorization();

app.MapControllers();

app.Run();
