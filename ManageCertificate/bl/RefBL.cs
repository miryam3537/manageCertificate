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
namespace BL

{
    public class RefBL : IRefBL
    {
        IMapper mapper;
        IRefDAL refDAL;

        public RefBL(IRefDAL refDAL,IMapper mapper)
        {
            this.mapper = mapper;
            this.refDAL = refDAL;
        }

        public Task<IEnumerable<RefStatus>> GetAllStatus()
        {
            return refDAL.GetAllStatus();
        }
        public async Task<RefInventoryDTO> GetInventoryById(int concilId, int certificateId)
        {
            RefInventory inventory = await refDAL.GetInventoryById(concilId,certificateId);
            RefInventoryDTO inventoryDTO = mapper.Map<RefInventoryDTO>(inventory);
            return inventoryDTO;
        }

        public async Task<List<RefInventoryDTO>> GetAllInventory()
        {
            List<RefInventory> inventoryies  = await refDAL.GetAllInventory();
            List<RefInventoryDTO> inventoryiesDTO = mapper.Map<List<RefInventoryDTO>>(inventoryies);
            return inventoryiesDTO;
        }
    }
}
