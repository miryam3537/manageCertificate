using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Entites;

namespace DAL;


public partial class DatotDbContext : DbContext
{
    public DatotDbContext()
    {
    }

    public DatotDbContext(DbContextOptions<DatotDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<RefCertificateType> RefCertificateTypes { get; set; }

    public virtual DbSet<RefCouncil> RefCouncils { get; set; }

    public virtual DbSet<RefInventory> RefInventories { get; set; }

    public virtual DbSet<RefStatus> RefStatuses { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=SRV2\\Teachers;Database=DatotDB;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.ToTable("Certificate", "dbo");

            entity.Property(e => e.CertificateId).HasColumnName("certificate_id");
            entity.Property(e => e.CertificateType).HasColumnName("certificate_type");
            entity.Property(e => e.Comment)
                .HasMaxLength(50)
                .HasColumnName("comment");
            entity.Property(e => e.RequestAmaunt).HasColumnName("request_amaunt");
            entity.Property(e => e.RequestId).HasColumnName("request_id");
            entity.Property(e => e.SupplyAmaunt).HasColumnName("supply_amaunt");

            entity.HasOne(d => d.CertificateTypeNavigation).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.CertificateType)
                .HasConstraintName("FK_Certificate_Type_REF_Certificate_Type");

            entity.HasOne(d => d.Request).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.RequestId)
                .HasConstraintName("FK_Certificate_Request");
        });

        modelBuilder.Entity<RefCertificateType>(entity =>
        {
            entity.ToTable("REF_Certificate_Type", "dbo");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<RefCouncil>(entity =>
        {
            entity.ToTable("REF_Council", "dbo");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<RefInventory>(entity =>
        {
            entity.HasKey(e => e.InventoryId);

            entity.ToTable("REF_Inventory", "dbo");

            entity.Property(e => e.InventoryId).HasColumnName("inventory_id");
            entity.Property(e => e.CertificateId).HasColumnName("certificate_id");
            entity.Property(e => e.CouncilId).HasColumnName("council_id");
            entity.Property(e => e.Inventory).HasColumnName("inventory");
            entity.Property(e => e.Minimum).HasColumnName("minimum");
            entity.Property(e => e.Year).HasColumnName("year");

            entity.HasOne(d => d.Certificate).WithMany(p => p.RefInventories)
                .HasForeignKey(d => d.CertificateId)
                .HasConstraintName("FK_REF_Inventory_REF_Certificate_Type");

            entity.HasOne(d => d.Council).WithMany(p => p.RefInventories)
                .HasForeignKey(d => d.CouncilId)
                .HasConstraintName("FK_REF_Inventory_REF_Council");
        });

        modelBuilder.Entity<RefStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ref_satus");

            entity.ToTable("REF_Status", "dbo");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("name");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.ToTable("Request", "dbo");

            entity.Property(e => e.RequestId).HasColumnName("request_id");
            entity.Property(e => e.Address)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("address");
            entity.Property(e => e.CouncilId).HasColumnName("council_id");
            entity.Property(e => e.DeliveredTo)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("delivered_to");
            entity.Property(e => e.DeliveryMethod)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("delivery_method");
            entity.Property(e => e.HandlingDate)
                .HasColumnType("datetime")
                .HasColumnName("handling_date");
            entity.Property(e => e.OfficeComment)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("office_comment");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("order_date");
            entity.Property(e => e.OrdererComment)
                .HasMaxLength(100)
                .HasColumnName("orderer_comment");
            entity.Property(e => e.OrdererEmail)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("orderer_email");
            entity.Property(e => e.OrdererName)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("orderer_name");
            entity.Property(e => e.OrdererPhone)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("orderer_phone");
            entity.Property(e => e.OrdererRole)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("orderer_role");
            entity.Property(e => e.RequestStatus).HasColumnName("request_status");

            entity.HasOne(d => d.Council).WithMany(p => p.Requests)
                .HasForeignKey(d => d.CouncilId)
                .HasConstraintName("FK_Request_REF_Council");

            entity.HasOne(d => d.RequestStatusNavigation).WithMany(p => p.Requests)
                .HasForeignKey(d => d.RequestStatus)
                .HasConstraintName("FK_Request_REF_Status");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
