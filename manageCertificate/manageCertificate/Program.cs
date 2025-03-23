using DAL;
using Microsoft.EntityFrameworkCore;
using BL;
using Microsoft.AspNetCore.SpaServices.AngularCli;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatotDbContext>(options => options.UseSqlServer("Server=SRV2\\Teachers;Database=DatotDB;Trusted_Connection=True;TrustServerCertificate=True"));
//builder.Configuration.GetConnectionString("SchooleConnection")));
builder.Services.AddScoped<ITestDAl, TestDAl>();
builder.Services.AddScoped<ITestBL, TestBL>();

// Add services to the container.
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


app.UseHttpsRedirection();
//app.UseStaticFiles();



app.UseAuthorization();

app.MapControllers();

app.Run();
