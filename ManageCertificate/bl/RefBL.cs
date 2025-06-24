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
   
    public class RefBL : IRefBL
    {
        IMapper mapper;
        IRefDAL refDAL;

        public RefBL(IRefDAL refDAL,IMapper mapper)
        {
            this.mapper = mapper;
            this.refDAL = refDAL;
        }
        public async Task<RefOfficeInventory> AddOfficeInventoryAsync(AddRefOfficeInventoryDTO dto)
        {
            return await refDAL.AddOfficeInventoryAsync(dto);
        }

        public Task<IEnumerable<RefOfficeInventory>> GetAllOfficeInventory()
        {
            return refDAL.GetAllOfficeInventory();
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

        public async Task<IEnumerable<CertificateDTO>> GetAllCertificate()
        {
            // שליפת כל הישויות מסוג Certificate
            IEnumerable<Certificate> certificates = await refDAL.GetAllCertificate();

            // מיפוי הרשימה ל-DTO
            IEnumerable<CertificateDTO> certificateDTOs = mapper.Map<IEnumerable<CertificateDTO>>(certificates);

            return certificateDTOs;
        }

        public  Task<List<RefCertificateType>> GetAllCertificateType()
        {
            return refDAL.GetAllCertificateType();
        }

        public async Task<bool> UpdateInventoryAmountAsync(int inventoryId, int? inventory)
        {
            return await refDAL.UpdateInventoryAmountAsync(inventoryId, inventory);
        }

        public async Task<bool> UpdateMinimum(int certificateId, int? minimum)
        {
            return await refDAL.UpdateMinimum(certificateId, minimum);
        }
    }
}
