using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;
using DAL.Interfaces;
using BL.Interfaces;
using DAL;
using DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
namespace BL

     

{
    public class CouncilBL : ICouncilBL
    {
        IMapper mapper;
        ICouncilDAL councilDAL;
        DatotDbContext _context;
        public CouncilBL(ICouncilDAL councilDAL, IMapper mapper, DatotDbContext contex)
        {
            this.mapper = mapper;
            this.councilDAL = councilDAL;
            _context = contex;
    }

        public Task<IEnumerable<RefCouncil>> GetAllcouncil()
        {
            return councilDAL.GetAllcouncil();
        }






    }
}
